using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using System.Linq;  // Add this for LINQ

public class PlayerController : MonoBehaviour
{
    [Header("Movement Settings")]
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float jumpForce = 12f;
    [SerializeField] private float fallMultiplier = 2.5f;
    [SerializeField] private float lowJumpMultiplier = 2f;
    [SerializeField] private float groundCheckRadius = 0.2f;
    [SerializeField] private LayerMask groundLayer;
    [SerializeField] private Transform groundCheck;
    [SerializeField] private float coyoteTime = 0.2f;
    [SerializeField] private float jumpBufferTime = 0.2f;
    [SerializeField] private bool showDebugGizmos = true;  // Add this to toggle debug visualization
    [SerializeField] private Vector2 groundCheckBoxSize = new Vector2(0.5f, 0.1f);

    [Header("Mobile Controls")]
    [SerializeField] private Button moveLeftButton;
    [SerializeField] private Button moveRightButton;
    [SerializeField] private Button jumpButton;

    [SerializeField] private Transform[] groundChecks;

    private Rigidbody2D rb;
    private Animator animator;
    private SpriteRenderer spriteRenderer;
    private bool isGrounded;
    private float horizontalInput;
    private float coyoteTimeCounter;
    private float jumpBufferCounter;
    private bool isJumping;
    private bool isMovingLeft;
    private bool isMovingRight;
    private bool isJumpPressed;

    private void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
        spriteRenderer = GetComponent<SpriteRenderer>();

        // Debug Animator setup
        if (animator == null)
        {
            Debug.LogError("No Animator component found on the player!");
        }
        else
        {
            Debug.Log("Animator component found. Controller: " + (animator.runtimeAnimatorController != null ? animator.runtimeAnimatorController.name : "null"));
        }
    }

    private void Start()
    {
        SetupMobileControls();
        
        // Debug ground layer setup
        if (groundLayer.value == 0)
        {
            Debug.LogError("Ground Layer is not set! Please set the Ground Layer in the inspector.");
        }
        else
        {
            Debug.Log($"Ground Layer is set to: {LayerMask.LayerToName(Mathf.RoundToInt(Mathf.Log(groundLayer.value, 2)))}");
        }
    }

    private void SetupMobileControls()
    {
        if (moveLeftButton != null)
        {
            EventTrigger trigger = moveLeftButton.gameObject.AddComponent<EventTrigger>();
            
            // Pointer Down
            EventTrigger.Entry pointerDown = new EventTrigger.Entry();
            pointerDown.eventID = EventTriggerType.PointerDown;
            pointerDown.callback.AddListener((data) => { isMovingLeft = true; });
            trigger.triggers.Add(pointerDown);
            
            // Pointer Up
            EventTrigger.Entry pointerUp = new EventTrigger.Entry();
            pointerUp.eventID = EventTriggerType.PointerUp;
            pointerUp.callback.AddListener((data) => { isMovingLeft = false; });
            trigger.triggers.Add(pointerUp);
        }

        if (moveRightButton != null)
        {
            EventTrigger trigger = moveRightButton.gameObject.AddComponent<EventTrigger>();
            
            // Pointer Down
            EventTrigger.Entry pointerDown = new EventTrigger.Entry();
            pointerDown.eventID = EventTriggerType.PointerDown;
            pointerDown.callback.AddListener((data) => { isMovingRight = true; });
            trigger.triggers.Add(pointerDown);
            
            // Pointer Up
            EventTrigger.Entry pointerUp = new EventTrigger.Entry();
            pointerUp.eventID = EventTriggerType.PointerUp;
            pointerUp.callback.AddListener((data) => { isMovingRight = false; });
            trigger.triggers.Add(pointerUp);
        }

        if (jumpButton != null)
        {
            // Add both EventTrigger and Button click handler
            EventTrigger trigger = jumpButton.gameObject.AddComponent<EventTrigger>();
            
            // Pointer Down
            EventTrigger.Entry pointerDown = new EventTrigger.Entry();
            pointerDown.eventID = EventTriggerType.PointerDown;
            pointerDown.callback.AddListener((data) => { 
                isJumpPressed = true;
                Debug.Log("Jump button pressed");
                TryJump();
            });
            trigger.triggers.Add(pointerDown);
            
            // Pointer Up
            EventTrigger.Entry pointerUp = new EventTrigger.Entry();
            pointerUp.eventID = EventTriggerType.PointerUp;
            pointerUp.callback.AddListener((data) => { 
                isJumpPressed = false;
                Debug.Log("Jump button released");
            });
            trigger.triggers.Add(pointerUp);

            // Also add click handler as backup
            jumpButton.onClick.AddListener(() => {
                Debug.Log("Jump button clicked");
                TryJump();
            });
        }
    }

    private void OnDrawGizmos()
    {
        if (showDebugGizmos && groundCheck != null)
        {
            Gizmos.color = Color.green;
            Gizmos.DrawWireCube(groundCheck.position, groundCheckBoxSize);
        }
    }

    private void Update()
    {
        // Check if grounded with debug info
        if (groundCheck == null)
        {
            Debug.LogError("Ground Check Transform is not assigned!");
            return;
        }

        // Perform the ground check
        isGrounded = IsGrounded();
        
        // Debug information
        if (!isGrounded)
        {
            // Check if there are any colliders in the area
            Collider2D[] colliders = Physics2D.OverlapCircleAll(groundCheck.position, groundCheckRadius);
            if (colliders.Length > 0)
            {
                string colliderNames = "";
                foreach (Collider2D collider in colliders)
                {
                    colliderNames += collider.gameObject.name + ", ";
                }
                Debug.Log($"Found {colliders.Length} colliders but none on ground layer. Colliders: {colliderNames}");
            }
        }
        
        Debug.Log($"IsGrounded: {isGrounded}, GroundCheck Position: {groundCheck.position}, Ground Layer: {groundLayer.value}, Layer Name: {LayerMask.LayerToName(Mathf.RoundToInt(Mathf.Log(groundLayer.value, 2)))}");

        // Handle coyote time
        if (isGrounded)
        {
            coyoteTimeCounter = coyoteTime;
            isJumping = false;
        }
        else
        {
            coyoteTimeCounter -= Time.deltaTime;
        }

        // Handle jump buffer
        if (Input.GetButtonDown("Jump") || isJumpPressed)
        {
            jumpBufferCounter = jumpBufferTime;
            Debug.Log("Jump buffer started");
        }
        else
        {
            jumpBufferCounter -= Time.deltaTime;
        }

        // Try to jump if conditions are met
        if (jumpBufferCounter > 0f && (coyoteTimeCounter > 0f || isGrounded) && !isJumping)
        {
            TryJump();
            jumpBufferCounter = 0f;
        }

        // Update horizontal input based on mobile controls
        horizontalInput = 0f;
        if (isMovingLeft) horizontalInput = -1f;
        if (isMovingRight) horizontalInput = 1f;

        // Update animations
        UpdateAnimations();
    }

    private void FixedUpdate()
    {
        // Apply movement
        Vector2 movement = new Vector2(horizontalInput * moveSpeed, rb.linearVelocity.y);
        rb.linearVelocity = movement;

        // Apply better jump physics
        if (rb.linearVelocity.y < 0)
        {
            rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (fallMultiplier - 1) * Time.fixedDeltaTime;
        }
        else if (rb.linearVelocity.y > 0 && !Input.GetButton("Jump") && !isJumpPressed)
        {
            rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (lowJumpMultiplier - 1) * Time.fixedDeltaTime;
        }
    }

    private void TryJump()
    {
        Debug.Log($"Attempting to jump - CoyoteTime: {coyoteTimeCounter}, IsJumping: {isJumping}, IsGrounded: {isGrounded}");
        if ((coyoteTimeCounter > 0f || isGrounded) && !isJumping)
        {
            Debug.Log("Jump executed!");
            rb.linearVelocity = new Vector2(rb.linearVelocity.x, jumpForce);
            isJumping = true;
            coyoteTimeCounter = 0f;
            jumpBufferCounter = 0f;
        }
    }

    private void UpdateAnimations()
    {
        if (animator != null)
        {
            // Running animation
            animator.SetBool("IsRunning", Mathf.Abs(horizontalInput) > 0.1f && isGrounded);

            // Jumping animation: only when not grounded and moving up
            bool isJumping = !isGrounded && rb.linearVelocity.y > 0.1f;
            animator.SetBool("IsJumping", isJumping);
            Debug.Log("IsJumping: " + isJumping + " | isGrounded: " + isGrounded + " | velocity.y: " + rb.linearVelocity.y);

            // (Optional) Falling animation: only when not grounded and moving down
            // bool isFalling = !isGrounded && rb.velocity.y < -0.1f;
            // animator.SetBool("IsFalling", isFalling);
        }

        // Flip sprite based on movement direction
        if (spriteRenderer != null && horizontalInput != 0)
        {
            spriteRenderer.flipX = horizontalInput < 0;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.layer == LayerMask.NameToLayer("Ground"))
        {
            isJumping = false;
            Debug.Log("Landed on ground");
        }
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapBox(groundCheck.position, groundCheckBoxSize, 0f, groundLayer);
    }
} 
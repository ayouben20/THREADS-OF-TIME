using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    [Header("Follow Settings")]
    [SerializeField] private Transform target;            // The player to follow
    [SerializeField] private float smoothSpeed = 0.125f;  // How smoothly the camera follows
    [SerializeField] private Vector3 offset;             // Camera offset from player

    [Header("Boundaries")]
    [SerializeField] private bool useBoundaries = false;  // Enable/disable boundaries
    [SerializeField] private float minX = -10f;          // Minimum X position
    [SerializeField] private float maxX = 10f;           // Maximum X position
    [SerializeField] private float minY = -10f;          // Minimum Y position
    [SerializeField] private float maxY = 10f;           // Maximum Y position

    private void Start()
    {
        // If no target is assigned, try to find the player
        if (target == null)
        {
            GameObject player = GameObject.FindGameObjectWithTag("Player");
            if (player != null)
            {
                target = player.transform;
            }
            else
            {
                Debug.LogWarning("No target assigned to CameraFollow and no Player found!");
            }
        }

        // If no offset is set, use current position
        if (offset == Vector3.zero)
        {
            offset = transform.position - target.position;
        }
    }

    private void LateUpdate()
    {
        if (target == null) return;

        // Calculate desired position
        Vector3 desiredPosition = target.position + offset;
        
        // Apply boundaries if enabled
        if (useBoundaries)
        {
            desiredPosition.x = Mathf.Clamp(desiredPosition.x, minX, maxX);
            desiredPosition.y = Mathf.Clamp(desiredPosition.y, minY, maxY);
        }

        // Smoothly move camera
        Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPosition, smoothSpeed);
        transform.position = smoothedPosition;
    }

    // Optional: Method to change target during runtime
    public void SetTarget(Transform newTarget)
    {
        target = newTarget;
    }

    // Optional: Method to update boundaries during runtime
    public void SetBoundaries(float newMinX, float newMaxX, float newMinY, float newMaxY)
    {
        minX = newMinX;
        maxX = newMaxX;
        minY = newMinY;
        maxY = newMaxY;
    }
} 
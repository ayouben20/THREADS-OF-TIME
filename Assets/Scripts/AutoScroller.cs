using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class AutoScroller : MonoBehaviour, IPointerClickHandler
{
    public ScrollRect scrollRect;
    public float scrollSpeed = 20f; // Adjust to control speed
    private bool isPaused = false;

    private void OnEnable()
    {
        // Reset scrolling when enabled (when user comes back)
        scrollRect.verticalNormalizedPosition = 1f;
        isPaused = false;
    }

    private void Update()
    {
        if (scrollRect != null && !isPaused)
        {
            // Scroll down automatically (from top to bottom)
            float newY = scrollRect.verticalNormalizedPosition - (Time.deltaTime * scrollSpeed / 1000f);
            scrollRect.verticalNormalizedPosition = Mathf.Clamp01(newY);
        }
    }

    // This will pause scrolling when user taps anywhere on the ScrollRect's content
    public void OnPointerClick(PointerEventData eventData)
    {
        isPaused = !isPaused;
    }
}
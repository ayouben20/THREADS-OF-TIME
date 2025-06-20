using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class TeleportOnTrigger : MonoBehaviour
{
    public Image fadeImage;             // Drag your fade UI Image here
    public Transform player;            // Your player GameObject
    public Transform teleportTarget;    // Where the player should be moved to
    public float fadeDuration = 1f;

    private bool isFading = false;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (!isFading && other.CompareTag("Player"))
        {
            StartCoroutine(FadeOutTeleportFadeIn());
        }
    }

    IEnumerator FadeOutTeleportFadeIn()
    {
        isFading = true;

        // Fade to black
        float elapsed = 0f;
        while (elapsed < fadeDuration)
        {
            elapsed += Time.deltaTime;
            float alpha = Mathf.Clamp01(elapsed / fadeDuration);
            fadeImage.color = new Color(0, 0, 0, alpha);
            yield return null;
        }

        // Teleport
        player.position = teleportTarget.position;

        // Fade back in
        elapsed = 0f;
        while (elapsed < fadeDuration)
        {
            elapsed += Time.deltaTime;
            float alpha = Mathf.Clamp01(1 - (elapsed / fadeDuration));
            fadeImage.color = new Color(0, 0, 0, alpha);
            yield return null;
        }

        isFading = false;
    }
}

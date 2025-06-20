using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class FadeController : MonoBehaviour
{
    public Image fadeImage;
    public Transform player;
    public Transform teleportTarget;
    public float fadeSpeed = 1f; // seconds for full fade in/out

    public void FadeAndTeleport()
    {
        StartCoroutine(FadeOutAndTeleport());
    }

    IEnumerator FadeOutAndTeleport()
    {
        // Fade to black
        float elapsed = 0f;
        while (elapsed < fadeSpeed)
        {
            elapsed += Time.deltaTime;
            float alpha = Mathf.Clamp01(elapsed / fadeSpeed);
            fadeImage.color = new Color(0, 0, 0, alpha);
            yield return null;
        }

        // Teleport player
        player.position = teleportTarget.position;

        // Fade back in
        elapsed = 0f;
        while (elapsed < fadeSpeed)
        {
            elapsed += Time.deltaTime;
            float alpha = Mathf.Clamp01(1 - (elapsed / fadeSpeed));
            fadeImage.color = new Color(0, 0, 0, alpha);
            yield return null;
        }
    }
}

using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using System.Collections;

public class LoadingManager : MonoBehaviour
{
    public Image fadePanel;

    void Start()
    {
        StartCoroutine(LoadSceneAsync());
    }

    IEnumerator LoadSceneAsync()
    {
        yield return StartCoroutine(FadeIn());

        // Start loading target scene
        AsyncOperation asyncLoad = SceneManager.LoadSceneAsync(SceneLoader.sceneToLoad);
        asyncLoad.allowSceneActivation = false;

        // Optional delay while hourglass animates
        yield return new WaitForSeconds(2f);

        yield return StartCoroutine(FadeOut());

        asyncLoad.allowSceneActivation = true;
    }

    IEnumerator FadeIn()
    {
        Color color = fadePanel.color;
        for (float t = 1f; t >= 0; t -= Time.deltaTime)
        {
            color.a = t;
            fadePanel.color = color;
            yield return null;
        }
        fadePanel.gameObject.SetActive(false);
    }

    IEnumerator FadeOut()
    {
        fadePanel.gameObject.SetActive(true);
        Color color = fadePanel.color;
        for (float t = 0; t <= 1f; t += Time.deltaTime)
        {
            color.a = t;
            fadePanel.color = color;
            yield return null;
        }
    }
}
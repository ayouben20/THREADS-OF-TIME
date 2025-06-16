using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;

public class PauseManager : MonoBehaviour
{
    public GameObject HUDcanvas;     // In-game HUD
    public GameObject uiPause;       // Pause menu
    public GameObject UiGameover;    // Game over screen (not yet used in logic, but ready)

    private string loadingSceneName = "LoadingScene";
    private string mainMenuSceneName = "Main Menu";
    private string gameplaySceneName = "SampleScene";

  
    public void PauseGame()
    {
        Debug.Log("PauseGame called");
        Time.timeScale = 0f;
        HUDcanvas.SetActive(false);
        uiPause.SetActive(true);
    }

    public void ResumeGame()
    {
        Debug.Log("ResumeGame called");
        Time.timeScale = 1f;
        HUDcanvas.SetActive(true);
        uiPause.SetActive(false);
    }

    public void LoadMainMenu()
    {
        Debug.Log("LoadMainMenu called");
        Time.timeScale = 1f;
        SceneManager.LoadScene(mainMenuSceneName);
    }

    public void RestartGame()
    {
        Debug.Log("RestartGame called");
        Time.timeScale = 1f;
        StartCoroutine(LoadSceneWithLoading(gameplaySceneName));
    }

    private IEnumerator LoadSceneWithLoading(string targetScene)
    {
        // Load the loading scene asynchronously and wait for it to finish
        AsyncOperation asyncLoadLoading = SceneManager.LoadSceneAsync(loadingSceneName);
        while (!asyncLoadLoading.isDone)
        {
            yield return null;
        }

        // Now load the target scene asynchronously and wait for it to finish
        AsyncOperation asyncLoadTarget = SceneManager.LoadSceneAsync(targetScene);
        while (!asyncLoadTarget.isDone)
        {
            yield return null;
        }
    }
    public class DebugButton : MonoBehaviour
    {
        public void PrintTest()
        {
            Debug.Log("Button clicked!");
        }
    }
}

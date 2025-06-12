using UnityEngine;

public class UIManager : MonoBehaviour
{
    public GameObject uiCanvas;     // Main menu UI
    public GameObject uiOptions;    // Options menu UI
    public GameObject uiPrivacy;    // Privacy policy UI

    public void ShowOptions()
    {
        uiCanvas.SetActive(false);
        uiOptions.SetActive(true);
        uiPrivacy.SetActive(false);
    }

    public void ShowPrivacyPolicy()
    {
        uiCanvas.SetActive(false);
        uiOptions.SetActive(false);
        uiPrivacy.SetActive(true);
    }

    public void BackToMainMenu()
    {
        uiOptions.SetActive(false);
        uiPrivacy.SetActive(false);
        uiCanvas.SetActive(true);
    }

    public void BackFromPrivacyToOptions()
    {
        uiPrivacy.SetActive(false);
        uiCanvas.SetActive(false);
        uiOptions.SetActive(true);
    }
    public void StartGame()
    {
        // Load the target game scene via the loading screen
        SceneLoader.LoadSceneWithLoading("SampleScene");
    }
    public void QuitGame()
    {
        Debug.Log("Quitting game...");

#if UNITY_EDITOR
        UnityEditor.EditorApplication.isPlaying = false;
#else
        Application.Quit();
#endif
    }
}
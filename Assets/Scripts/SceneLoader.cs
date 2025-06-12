using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public static string sceneToLoad;

    // Call this to load a scene via the loading screen
    public static void LoadSceneWithLoading(string targetScene)
    {
        sceneToLoad = targetScene;
        SceneManager.LoadScene("LoadingScene");
    }
}

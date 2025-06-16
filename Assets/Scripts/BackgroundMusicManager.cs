using UnityEngine;
using UnityEngine.SceneManagement;

public class BackgroundMusicManager : MonoBehaviour
{
    public AudioSource musicSource;
    public float fadeDuration = 2f;
    public float targetVolume = 0.2f;
    private bool shouldFade = false;

    private static BackgroundMusicManager instance;

    private const string VolumeKey = "MusicVolume";

    void Awake()
    {
        if (instance != null)
        {
            Destroy(gameObject);
            return;
        }

        instance = this;
        DontDestroyOnLoad(gameObject);

        // Apply saved volume or fallback to default (0.75) only if no volume was saved
        float savedVolume = PlayerPrefs.HasKey(VolumeKey) ? PlayerPrefs.GetFloat(VolumeKey) : 0.75f;
        musicSource.volume = savedVolume;

        SceneManager.sceneLoaded += OnSceneLoaded;
    }

    void Update()
    {
        if (shouldFade && musicSource != null)
        {
            musicSource.volume = Mathf.MoveTowards(musicSource.volume, targetVolume, Time.deltaTime / fadeDuration);

            if (Mathf.Approximately(musicSource.volume, targetVolume))
            {
                shouldFade = false;
            }
        }
    }

    void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        // Restore volume every time a new scene is loaded
        float savedVolume = PlayerPrefs.HasKey(VolumeKey) ? PlayerPrefs.GetFloat(VolumeKey) : 0.75f;
        musicSource.volume = savedVolume;

        // Optional scene-specific fade
        if (scene.name == "SampleScene")
        {
            shouldFade = true;
        }
    }

    private void OnDestroy()
    {
        SceneManager.sceneLoaded -= OnSceneLoaded;
    }
}

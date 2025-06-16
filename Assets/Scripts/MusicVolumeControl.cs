using UnityEngine;
using UnityEngine.UI;

public class MusicVolumeControl : MonoBehaviour
{
    public Slider musicSlider;
    private AudioSource musicSource;

    private const string VolumeKey = "MusicVolume";

    void Start()
    {
        BackgroundMusicManager bgManager = FindFirstObjectByType<BackgroundMusicManager>();

        if (bgManager != null)
        {
            musicSource = bgManager.musicSource;

            // Load saved volume (or default to 0.75 if not saved)
            float savedVolume = PlayerPrefs.HasKey(VolumeKey) ? PlayerPrefs.GetFloat(VolumeKey) : 0.75f;

            // Set both slider and audio source
            musicSource.volume = savedVolume;
            musicSlider.value = savedVolume;

            // Listen for slider changes
            musicSlider.onValueChanged.AddListener(SetVolume);
        }
        else
        {
            Debug.LogWarning("BackgroundMusicManager not found in the scene.");
        }
    }

    public void SetVolume(float value)
    {
        if (musicSource != null)
        {
            musicSource.volume = value;

            // Save only when user changes it
            PlayerPrefs.SetFloat(VolumeKey, value);
        }
    }
}

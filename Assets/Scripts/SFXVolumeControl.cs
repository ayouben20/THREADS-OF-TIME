using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Audio;

public class SFXVolumeControl : MonoBehaviour
{
    public Slider sfxSlider;             // Assign your UI slider here
    public AudioMixer audioMixer;        // Assign your AudioMixer here

    private const string SFXVolumeKey = "SFXVolume"; // PlayerPrefs key for saving volume

    void Start()
    {
        // Load the saved volume or default to 1 (full volume)
        float savedVolume = PlayerPrefs.HasKey(SFXVolumeKey) ? PlayerPrefs.GetFloat(SFXVolumeKey) : 1f;

        // Set slider value and apply volume on start
        sfxSlider.value = savedVolume;
        SetSFXVolume(savedVolume);

        // Add listener to update volume when slider changes
        sfxSlider.onValueChanged.AddListener(SetSFXVolume);
    }

    public void SetSFXVolume(float value)
    {
        // Convert to logarithmic scale for mixer (audio is not linear)
        float volume = Mathf.Log10(Mathf.Clamp(value, 0.0001f, 1f)) * 20f;

        // Set the exposed parameter in the AudioMixer
        audioMixer.SetFloat("SFXVolume", volume);

        // Save the value
        PlayerPrefs.SetFloat(SFXVolumeKey, value);
        Debug.Log("Set SFX volume to: " + volume);
    }


}

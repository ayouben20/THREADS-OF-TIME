using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Audio;

public class SafranUI : MonoBehaviour
{
    public Image safranFillImage;          // Your fill Image (set Image Type = Filled)
    public Text safranCounter;             // Text showing saffron count
    public int maxSafran = 10;             // Max saffron count for full bar

    public AudioClip collectSound;         // Your collect sound
    public AudioMixerGroup audioMixerGroup; // Your Audio Mixer Group

    private int currentSafran = 0;
    private AudioSource audioSource;

    void Awake()
    {
        audioSource = gameObject.AddComponent<AudioSource>();
        audioSource.outputAudioMixerGroup = audioMixerGroup;
    }

    void Start()
    {
        UpdateUI();
    }

    // Call this from your Inventory or collectible script when saffron is collected
    public void AddSafran(int amount = 1)
    {
        currentSafran += amount;
        if (currentSafran > maxSafran)
            currentSafran = maxSafran;

        UpdateUI();
        PlayCollectSound();
    }

    void UpdateUI()
    {
        if (safranFillImage != null)
            safranFillImage.fillAmount = (float)currentSafran / maxSafran;

        if (safranCounter != null)
            safranCounter.text = currentSafran.ToString();
    }

    void PlayCollectSound()
    {
        if (collectSound != null)
            audioSource.PlayOneShot(collectSound);
    }
}

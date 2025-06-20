using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Audio;

public class Inventory : MonoBehaviour
{
    public Text safranCounter;          // Text showing saffron count
    public Image safranFillImage;       // The fill image (set Image Type = Filled in Inspector)
    public int maxSafran = 10;          // Max saffron for full bar

    public AudioClip collectSound;      // Collect sound clip
    public AudioMixerGroup audioMixerGroup;  // Your audio mixer group for sounds

    private int safran = 0;
    private AudioSource audioSource;

    private void Awake()
    {
        audioSource = gameObject.AddComponent<AudioSource>();
        audioSource.outputAudioMixerGroup = audioMixerGroup;
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Collectible"))
        {
            Collect(other.GetComponent<Collectible>());
        }
    }

    private void Collect(Collectible collectible)
    {
        if (collectible.Collect())
        {
            if (collectible is SafranCollectible)
            {
                safran++;
                if (safran > maxSafran)
                    safran = maxSafran;

                UpdateFillBar();
                PlayCollectSound();
            }
            UpdateGUI();
        }
    }

    private void UpdateGUI()
    {
        safranCounter.text = safran.ToString();
    }

    private void UpdateFillBar()
    {
        if (safranFillImage != null)
            safranFillImage.fillAmount = (float)safran / maxSafran;
    }

    private void PlayCollectSound()
    {
        if (collectSound != null)
            audioSource.PlayOneShot(collectSound);
    }
}

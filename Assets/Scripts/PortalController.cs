using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;

public class PortalController : MonoBehaviour
{
    public Transform destination;
    public AudioClip teleportSound;                   // Assign your teleport sound here
    public AudioMixerGroup audioMixerGroup;           // Assign your Audio Mixer group here

    private GameObject player;
    private AudioSource audioSource;

    private void Awake()
    {
        player = GameObject.FindGameObjectWithTag("Player");

        // Add audio source for teleport sound
        audioSource = gameObject.AddComponent<AudioSource>();
        audioSource.outputAudioMixerGroup = audioMixerGroup;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            if (Vector2.Distance(player.transform.position, transform.position) > 0.3f)
            {
                // Play sound before teleporting
                PlayTeleportSound();

                // Move player
                player.transform.position = destination.position;
            }
        }
    }

    private void PlayTeleportSound()
    {
        if (teleportSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(teleportSound);
        }
    }
}

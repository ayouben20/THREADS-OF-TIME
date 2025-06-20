using UnityEngine;
using UnityEngine.Audio;

public class PlayerSoundController : MonoBehaviour
{
    public AudioClip jumpSound;
    public AudioClip moveSound;
    public AudioMixerGroup audioMixerGroup;

    private AudioSource moveAudioSource;
    private AudioSource jumpAudioSource;

    private void Awake()
    {
        // One audio source for jumping
        jumpAudioSource = gameObject.AddComponent<AudioSource>();
        jumpAudioSource.outputAudioMixerGroup = audioMixerGroup;

        // One audio source for looping movement
        moveAudioSource = gameObject.AddComponent<AudioSource>();
        moveAudioSource.loop = true;
        moveAudioSource.outputAudioMixerGroup = audioMixerGroup;
        moveAudioSource.clip = moveSound;
    }

    public void PlayJumpSound()
    {
        if (jumpSound != null)
            jumpAudioSource.PlayOneShot(jumpSound);
    }

    public void StartMoveSound()
    {
        if (moveSound != null && !moveAudioSource.isPlaying)
        {
            moveAudioSource.Play();
        }
    }

    public void StopMoveSound()
    {
        if (moveAudioSource.isPlaying)
        {
            moveAudioSource.Stop();
        }
    }
}

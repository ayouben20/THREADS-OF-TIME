using UnityEngine;
using UnityEngine.Audio;

public class SceneAudioController : MonoBehaviour
{
    public AudioClip introVoiceClip;        // Woman voice line
    public AudioClip cricketsLoopClip;      // Crickets ambient loop
    public AudioMixerGroup audioMixerGroup; // Assign your SFX or Ambient group

    private AudioSource voiceSource;
    private AudioSource cricketsSource;

    void Start()
    {
        // AudioSource for voice line (one-shot)
        voiceSource = gameObject.AddComponent<AudioSource>();
        voiceSource.outputAudioMixerGroup = audioMixerGroup;

        // AudioSource for crickets loop (looped, quieter)
        cricketsSource = gameObject.AddComponent<AudioSource>();
        cricketsSource.clip = cricketsLoopClip;
        cricketsSource.loop = true;
        cricketsSource.outputAudioMixerGroup = audioMixerGroup;
        cricketsSource.volume = 0.010f; // Lower volume for crickets (adjust as needed)

        PlaySceneSounds();
    }

    void PlaySceneSounds()
    {
        // Play intro voice
        if (introVoiceClip != null)
            voiceSource.PlayOneShot(introVoiceClip);

        // Start crickets loop
        if (cricketsLoopClip != null)
            cricketsSource.Play();
    }
}

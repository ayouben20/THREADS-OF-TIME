using UnityEngine;

public class ButtonSoundPlayer : MonoBehaviour
{
    public AudioClip buttonSound;

    public void PlaySound()
    {
        if (buttonSound != null && UIAudioManager.Instance != null)
        {
            UIAudioManager.Instance.PlaySound(buttonSound);
        }
    }
}
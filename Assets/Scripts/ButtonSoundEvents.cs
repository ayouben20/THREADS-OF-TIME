using UnityEngine;
using UnityEngine.EventSystems;

public class ButtonSoundEvents : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    public PlayerSoundController soundController;

    public void OnPointerDown(PointerEventData eventData)
    {
        soundController.StartMoveSound();
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        soundController.StopMoveSound();
    }
}
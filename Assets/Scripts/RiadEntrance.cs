using UnityEngine;

public class RiadEntrance : MonoBehaviour
{
    public GameObject enterButton;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            enterButton.SetActive(true);
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            enterButton.SetActive(false);
        }
    }
}

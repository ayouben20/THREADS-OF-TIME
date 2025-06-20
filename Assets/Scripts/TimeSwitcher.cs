using UnityEngine;

public class TimeSwitcher : MonoBehaviour
{
    public GameObject pastEnvironment;
    public GameObject futureEnvironment;
    public Transform player;
    public Transform pastSpawnPoint;
    public Transform futureSpawnPoint;

    private bool isInFuture = false;

    void Start()
    {
        SwitchToPast(); // Démarrer dans le passé
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.T))
        {
            if (isInFuture)
                SwitchToPast();
            else
                SwitchToFuture();
        }
    }

    void SwitchToPast()
    {
        futureEnvironment.SetActive(false);
        pastEnvironment.SetActive(true);
        player.position = pastSpawnPoint.position;
        isInFuture = false;
    }

    void SwitchToFuture()
    {
        pastEnvironment.SetActive(false);
        futureEnvironment.SetActive(true);
        player.position = futureSpawnPoint.position;
        isInFuture = true;
    }
}

using UnityEngine;

public class HourglassFlip : MonoBehaviour
{
    public float flipDuration = 1f;
    private Quaternion startRotation;
    private Quaternion endRotation;
    private float t = 0f;

    void Start()
    {
        startRotation = Quaternion.Euler(0, 0, 0);
        endRotation = Quaternion.Euler(0, 0, 180);
    }

    void Update()
    {
        t += Time.deltaTime / flipDuration;
        float curve = Mathf.SmoothStep(0, 1, t);
        transform.rotation = Quaternion.Lerp(startRotation, endRotation, curve);

        if (t >= 1f)
        {
            t = 0f;
            var temp = startRotation;
            startRotation = endRotation;
            endRotation = temp;
        }
    }
}
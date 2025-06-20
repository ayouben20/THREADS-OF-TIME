using UnityEngine;
using UnityEngine.Video;

public class VideoController : MonoBehaviour
{
    public VideoPlayer videoPlayer;
    public GameObject uiCanvas;  // Assign your Canvas GameObject here

    void Start()
    {
        // Hide the entire Canvas at start
        uiCanvas.SetActive(false);

        // Subscribe to video finish event
        videoPlayer.loopPointReached += OnVideoFinished;
    }

    void OnVideoFinished(VideoPlayer vp)
    {
        // Show the Canvas when video finishes
        uiCanvas.SetActive(true);
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Inventory : MonoBehaviour{

    public Text safranCounter;

    private int safran = 0;



    private void OnTriggerEnter2D(Collider2D other) {
        if (other.CompareTag("Collectible")) {
            Collect(other.GetComponent<Collectible>());
        }
    }
        
     

    private void Collect(Collectible collectible){
         if (collectible.Collect()){
             if (collectible is SafranCollectible){
                safran++;
             }
             UpdateGUI();
         }
    }
    private void UpdateGUI()
    {
        safranCounter.text = safran.ToString();
    }

}


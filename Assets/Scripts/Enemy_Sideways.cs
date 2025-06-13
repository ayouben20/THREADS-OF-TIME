using UnityEngine;

public class Enemy_Sideways : MonoBehaviour
{
    [SerializeField] private float damage;

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.tag == "Wizard Variant")
        {
            collision.GetComponent<Health>().TakeDamage(damage);
        }
    }
}

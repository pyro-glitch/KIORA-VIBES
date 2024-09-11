// Dynamically load the PayPal SDK script
const script = document.createElement('script');
script.src = "https://www.paypal.com/sdk/js?client-id=AUh8Uq_EsHhnWizvFLbvkJcItSPhCbmaZLdSg53oubIvigqXF3RYpEASVyA1ZwfHO-iFcgNZlgofAEDS&vault=true&intent=subscription";
script.setAttribute('data-sdk-integration-source', 'button-factory');
script.onload = function() {
    // Initialize PayPal buttons after the script is loaded
    const queryString = window.location.search;

    // Parse the query string to extract parameters
    const urlParams = new URLSearchParams(queryString);

    // Get the 'id' parameter value
    const planID = urlParams.get('id');
    console.log("planID");
    console.log(planID);

    paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: planID
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
      }
    }).render('#paypal-button-container'); // Renders the PayPal button
};

// Append the script to the document head or body
document.head.appendChild(script);

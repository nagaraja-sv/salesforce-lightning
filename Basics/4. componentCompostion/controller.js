({
    // Load expenses from Salesforce
    doInit: function(component, event, helper) {
        // Create the action
        var action = component.get("c.getAllContact");
        // Add callback behavior for when response is received
        action.setParams({
            "aid":component.get("v.recordId")
        })
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(response.getReturnValue());
            if (state == "SUCCESS") {
                component.set("v.contactlist", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    doRedirect: function(component, event, helper) {
        var eventSource = event.getSource();
        console.log('eventSource'+eventSource); 
        var cid = eventSource.get("v.name");
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": cid,
            "slideDevName": "detail"
        });
        navEvt.fire();
    }
})
({
fetchAccHelper : function(component, event, helper) {
    component.set('v.mycolumns', [
        {label: 'Account Name', fieldName: 'Name', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'Phone'},
            {label: 'Website', fieldName: 'Website', type: 'url '},
            {type: "button", typeAttributes: {
            label: 'View',
            name: 'View',
            title: 'View',
            disabled: false,
            value: 'view',
            iconPosition: 'left'
        }},
        {type: "button", typeAttributes: {
            label: 'Edit',
            name: 'Edit',
            title: 'Edit',
            disabled: false,
            value: 'edit',
            iconPosition: 'left'
        }}
        ]);
    var action = component.get("c.fetchAccounts");
    action.setParams({
    });
    action.setCallback(this, function(response){
        var state = response.getState();
        if (state === "SUCCESS") {
            component.set("v.acctList", response.getReturnValue());
        }
    });
    $A.enqueueAction(action);
},
viewRecordHelper : function(component, event, helper) {
    var recId = event.getParam('row').Id;
    var actionName = event.getParam('action').name;
    if ( actionName == 'Edit' ) {
        alert('Edit');
        var editRecordEvent = $A.get("e.force:editRecord");
        alert('editRecordEvent'+editRecordEvent);
        editRecordEvent.setParams({
            "recordId": recId
        });
        editRecordEvent.fire();
    } else if ( actionName == 'View') {
        alert('view');
        var viewRecordEvent = $A.get("e.force:navigateToURL");
            alert('viewRecordEvent'+viewRecordEvent);
        viewRecordEvent.setParams({
            "url": "/" + recId
        });
        viewRecordEvent.fire();
    }
}
})
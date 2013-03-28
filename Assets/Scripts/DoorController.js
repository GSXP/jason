#pragma strict

import System.Collections.Generic;

var targetDoor : DoorController;
// Make this a list if multiple objects can come through at once
private var inboundObjects : List.<GameObject>;

function Start() {
	// If I'm a door that goes somewhere
	if (targetDoor != null) {	
		// render me
		renderer.enabled = true;
		// allow character to pass over me
		collider.isTrigger = true;
		// Prepare inbound queue
		inboundObjects = new List.<GameObject>();
	}
}

// Allows doors to tell each other that someone is coming so they don't get stuck in a teleporting loop
function incoming(object : GameObject) {
	inboundObjects.Add(object);
}

// GSXPCamera calls this when it arrives in the new room
function arrived() {
	for each (var object in inboundObjects) {
		if (object.name == "Sidekick") {
			object.SetActive(true);
			return;
		}
	}
	
	// Sanity Check
	print("Hey you called arrived on a door but the sidekick isn't here!");
}

function OnTriggerEnter(collidee : Collider) {
	var obj = collidee.gameObject;
	
	if (inboundObjects.Contains(obj)) {
		// Whatever just entered came from another door, so don't send it back
		return;
	}
	
	// Otherwise, teleport to the targetdoor
	targetDoor.incoming(obj.gameObject);
	var doorpos : Vector3 = targetDoor.transform.position;
	obj.transform.position.x = doorpos.x;
	obj.transform.position.y = doorpos.y;
	
	// If it's the sidekick, have the camera follow
	if (obj.name == "Sidekick") {
		Time.timeScale = 0;
		obj.SetActive(false);
		obj.GetComponent(SidekickMovement).clearTarget();
		Camera.main.GetComponent(GSXPCam).moveToDoor(targetDoor.gameObject);
	} else if(obj.GetComponent(NPCMovement) != null) {
		// it's an npc
		// clear it's target now
		obj.GetComponent(NPCMovement).clearTarget();
	}
}

function OnTriggerExit(obj : Collider) {
	inboundObjects.Remove(obj.gameObject);
}
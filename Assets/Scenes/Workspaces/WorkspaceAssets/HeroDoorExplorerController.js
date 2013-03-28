#pragma strict
// ***THIS CODE IS NOT FOR PRODUCTION***
// This Controller picks a door then moves the hero to it. Once he's gone through the door he picks another one.
private var movement : NPCMovement;
private var stage : int;

function Start () {
	movement = gameObject.GetComponent(NPCMovement);
	stage = 0;
}

function Update () {

	switch(stage) {
	case 0:
		var target : Vector3 = GameObject.FindObjectsOfType(DoorController)[Random.Range(0,4)].gameObject.transform.position;
		target.z = 0;
		movement.setTarget(target);
		++stage;
		break;
	case 1:
		if (movement.getHasTarget() == false) {
			--stage;
		}
		break;
	}
}
#pragma strict

import System.Collections.Generic;

var mobsInThisRoom : List.<GameObject>;
private var heroIsHere : boolean;
private var sidekickIsHere : boolean;
private var minX : int;
private var maxX : int;
private var minY : int;
private var maxY : int;

function Start() {
	mobsInThisRoom = new List.<GameObject>();
	heroIsHere = false;
	sidekickIsHere = false;
	minX = gameObject.transform.position.x - 14;
	maxX = gameObject.transform.position.x + 14;
	minY = gameObject.transform.position.y - 6;
	maxY = gameObject.transform.position.y + 6;
}

function isHeroHere() {
	return heroIsHere;
}

function isSidekickHere() {
	return sidekickIsHere;
}

function OnTriggerEnter(objCollider : Collider) {
	switch (objCollider.name) {
		case "Hero":
			heroIsHere = true;
			break;
		case "Mob":
			mobsInThisRoom.Add(objCollider.gameObject);
			break;
		case "Sidekick":
			sidekickIsHere = true;
			break;
	}
	
	objCollider.gameObject.GetComponent(Behavior).setRoom(gameObject);
}

function OnTriggerExit(objCollider : Collider) {
	switch (objCollider.name) {
		case "Hero":
			heroIsHere = false;
			break;
		case "Mob":
			mobsInThisRoom.Remove(objCollider.gameObject);
			break;
		case "Sidekick":
			sidekickIsHere = false;
			break;
	}
}
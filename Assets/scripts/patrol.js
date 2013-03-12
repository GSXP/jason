#pragma strict

function Start () {
	boolean left = true;
	Debug.Log("true");
}

function Update () {
	
	if (left)
		if(transform.position.x < 100)
			transform.position.x++;
		else
			left = false;
	else
		if(transform.position.x > -100)
			transform.position.x--;
		else
			left = true;
		
}
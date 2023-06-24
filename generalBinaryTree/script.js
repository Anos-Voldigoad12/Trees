stack = [null];
class TreeNode
{
	constructor(data,id)
	{
		this.data = data;
		this.id = id;
		this.left = null;
		this.right = null;
	}
	
}
root = null;
level = 0;
id = 1;

function deleteNode()
{
	if(stack[stack.length-1].id === "root" && stack[stack.length-1].left === null && stack[stack.length-1].right === null)
	{
		document.getElementById(stack[stack.length-1].id).remove();
		document.getElementsByClassName("root-text")[0].remove();
		moveBack();
		return;
	}
	if(stack[stack.length-1].left !== null || stack[stack.length-1].right !== null) return;
	if(stack[stack.length-2].left === stack[stack.length-1])
	{
		stack[stack.length-2].left = null;
		document.getElementById(stack[stack.length-1].id+'-left').remove();
	}		
	else
	{
		stack[stack.length-2].right = null;
		document.getElementById(stack[stack.length-1].id+'-right').remove();
	}		
	document.getElementById(stack[stack.length-1].id).remove();
	moveBack();
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function numNodes(x)
{
	switch(x)
	{
		case 0 : return 1;
		case 1 : return 1; 
		default : return Math.pow(2,x-1);
	}
}
function search(svgs, x)
{
	for(let i=0;i<svgs.length;i++)
	{
		const child = svgs[i].querySelector(`[id="${x}"]`);
		if(child)
			return i;
	}
	return -1;
}
function updatePointerPosition()
{
	//console.log(stack);
	actives = document.getElementsByClassName("active");
	for(let i=0;i<actives.length;i++)
	{
		actives[i].classList.remove("active");
	}
	document.getElementById(stack[stack.length-1].id).classList.add("active");
}
async function updatePointerPositionByElement(element)
{
	actives = document.getElementsByClassName("active");
	
	for(let i=0;i<actives.length;i++)
	{
		actives[i].classList.remove("active");
	}
	document.getElementById(element.id).classList.add("active");
}
function addRootNode()
{
	if(document.getElementById("root")===null)
	{
		if(document.getElementById("rootData").value==="") return;
		
		root = new TreeNode(document.getElementById("rootData").value,"root");
		document.getElementById("rootData").value = "";
		stack.push(root);
		//console.log(stack);
		document.getElementById("outputs").innerHTML += `<svg class="${level}"><circle id="root" class="root"/><text class="root-text">${root.data}</text></svg><br>`;
	}
}
function addLeftNode()
{
	if(stack.length>1)
	{
		if(stack[stack.length-1].left===null)
		{
			if(document.getElementById("leftData").value==="") return;

			stack.push(new TreeNode(document.getElementById("leftData").value,id++));
			document.getElementById("leftData").value = "";
			stack[stack.length-2].left = stack[stack.length-1];
			level++;
			
			if(numNodes(level)*document.getElementsByTagName('svg')[0].clientWidth > document.getElementById("outputs").clientWidth)
			{
				alert("No More Space Left!");
				return;
			}
			
			svgs = document.getElementsByClassName(`${level}`);
			if(svgs.length!==numNodes(level))
			{
				for(let i=0; i<numNodes(level); i++)
					document.getElementById("outputs").innerHTML += `<svg class="${level}"></svg>`;
				document.getElementById("outputs").innerHTML += '<br>';
			}
			svgs = document.getElementsByClassName(`${level}`);
			psvgs = document.getElementsByClassName(`${level-1}`);
			
			if(document.getElementById(stack[stack.length-2].id).className.baseVal.includes("left"))
				index = 2*search(psvgs, stack[stack.length-2].id);
			else if(document.getElementById(stack[stack.length-2].id).className.baseVal.includes("right"))
				index = 2*search(psvgs, stack[stack.length-2].id) + 1;
			else
				index = 2*search(psvgs, stack[stack.length-2].id);
			
			svgs[index].innerHTML += `<circle id="${stack[stack.length-1].id}" class="left"/><text id="${stack[stack.length-1].id}-left" class="left-text">${stack[stack.length-1].data}</text>`;
			
			/*const childSVG = svgs[index];
			const parentSVG = psvgs[index/2];
			const child = childSVG.getElementById(stack[stack.length-1].id).getBoundingClientRect();
			const parent = parentSVG.getElementById(stack[stack.length-2].id).getBoundingClientRect();
			//console.log(child.left-childSVG.left+child.width/2);
			const line = document.createElementNS('http://www.w3.org/2000/svg','line');
			line.setAttribute('x1',child.left+child.width/2);
			line.setAttribute('y1',child.top+child.height/2);
			line.setAttribute('x2',parent.left+parent.width/2);
			line.setAttribute('y2',parent.top+parent.height/2);
			line.setAttribute('stroke','black');
			line.setAttribute('stroke-width',2);
			svgs[index].parentNode.appendChild(line);*/
			updatePointerPosition();
		}
	}
}

function addRightNode()
{
	if(stack.length>1)
	{
		if(stack[stack.length-1].right===null)
		{
			if(document.getElementById("rightData").value==="") return;

			stack.push(new TreeNode(document.getElementById("rightData").value,id++));
			document.getElementById("rightData").value = "";
			stack[stack.length-2].right = stack[stack.length-1];
			level++;
			
			if(numNodes(level)*document.getElementsByTagName('svg')[0].clientWidth > document.getElementById("outputs").clientWidth)
			{
				alert("No More Space Left!");
				return;
			}

			svgs = document.getElementsByClassName(`${level}`);
			if(svgs.length!==numNodes(level))
			{
				for(let i=0; i<numNodes(level); i++)
					document.getElementById("outputs").innerHTML += `<svg class="${level}"></svg>`;
				document.getElementById("outputs").innerHTML += '<br>';
			}
			svgs = document.getElementsByClassName(`${level}`);
			psvgs = document.getElementsByClassName(`${level-1}`);
			
			if(document.getElementById(stack[stack.length-2].id).className.baseVal.includes("left"))
				index = 2*search(psvgs, stack[stack.length-2].id);
			else if(document.getElementById(stack[stack.length-2].id).className.baseVal.includes("right"))
				index = 2*search(psvgs, stack[stack.length-2].id) + 1;
			else
				index = 2*search(psvgs, stack[stack.length-2].id);
			
			svgs[index].innerHTML += `<circle id="${stack[stack.length-1].id}" class="right"/><text id="${stack[stack.length-1].id}-right" class="right-text">${stack[stack.length-1].data}</text>`;
			updatePointerPosition();
		}
	}
}
function resetOrder()
{
	document.getElementById("traversal-order").innerHTML= "";
	document.getElementById("order-type").innerHTML = "";
	updatePointerPosition();
}
function moveBack()
{
	if(stack.length>2)
	{
		stack.pop();
		level--;
		updatePointerPosition();
	}
}
function moveLeft()
{
	if(stack[stack.length-1].left!==null)
		stack.push(stack[stack.length-1].left);
	else
		return;
	level++;
	updatePointerPosition();
}
function moveRight()
{
	if(stack[stack.length-1].right!==null)
		stack.push(stack[stack.length-1].right);
	else
		return;
	level++;
	updatePointerPosition();
}
async function preOrder(node)
{
	if(node===null)
		return;
	else
	{
		await updatePointerPositionByElement(node);
		document.getElementById("traversal-order").innerHTML += node.data + " ";
		await sleep(1000);
		await preOrder(node.left);
		await preOrder(node.right);
	}
}
async function inOrder(node)
{
	if(node===null)
		return;
	else
	{
		await inOrder(node.left);
		updatePointerPositionByElement(node);
		document.getElementById("traversal-order").innerHTML += node.data + " ";
		await sleep(1000);
		await inOrder(node.right);
	}
}
async function postOrder(node)
{
	if(node===null)
		return;
	else
	{
		await postOrder(node.left);
		await postOrder(node.right);
		updatePointerPositionByElement(node);
		document.getElementById("traversal-order").innerHTML += node.data + " ";
		await sleep(1000);
	}
}
async function traverse(order)
{
	document.getElementById("traversal-order").innerHTML= "";
	document.getElementById("order-type").innerHTML = "";
	switch(order)
	{
		case "pre" :
			document.getElementById("order-type").innerHTML = "Pre Order: "; 
			await preOrder(root);
			break;
		case "in" :
			document.getElementById("order-type").innerHTML = "In Order: "; 
			await inOrder(root);
			break;
		case "post" :
			document.getElementById("order-type").innerHTML = "Post Order: "; 
			await postOrder(root);
			break;
	}
	updatePointerPosition();
}
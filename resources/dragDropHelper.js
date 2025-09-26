function simulateDragDrop(sourceNode, destinationNode) 
{
    const dataTransfer = new DataTransfer();

    const dragStartEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
        dataTransfer
    });
    sourceNode.dispatchEvent(dragStartEvent);

    const dropEvent = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer
    });
    destinationNode.dispatchEvent(dropEvent);

    const dragEndEvent = new DragEvent('dragend', {
        bubbles: true,
        cancelable: true,
        dataTransfer
    });
    sourceNode.dispatchEvent(dragEndEvent);
}
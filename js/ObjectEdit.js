function ObjectEdit (data) {

    this.visual = null;
    this.outline = null; // ThreeJS box that is shown when an object is selected
    this.position = [0,0,0];
    this.rotation = [0,0,0];
    this.scale = [1,1,1];
    this.setData(data);
    this.data = this.getData(); // Used for undo/redo
}

ObjectEdit.prototype.setData = function(data) {
    var self = this;

    self.name = data.name;
    self.id = data.id;
    self.visible = data.visible;
    self.script = data.script;
    self.physics = data.physics; // TO-DO: do deep copy
    self.mesh = data.mesh;

    self.position[0] = data.position[0];
    self.position[1] = data.position[1];
    self.position[2] = data.position[2];
    self.rotation[0] = data.rotation[0];
    self.rotation[1] = data.rotation[1];
    self.rotation[2] = data.rotation[2];
    self.scale[0] = data.scale[0];
    self.scale[1] = data.scale[1];
    self.scale[2] = data.scale[2];
    
    self.updateVisual();
};

ObjectEdit.prototype.getData = function() {
    var self = this;

    var data = {
        name: self.name,
        id: self.id,
        visible: self.visible,
        script: self.script,
        physics: self.physics, // TO-DO: do deep copy
        mesh: self.mesh,
        position: [self.position[0], self.position[1], self.position[2]],
        rotation: [self.rotation[0], self.rotation[1], self.rotation[2]],
        scale: [self.scale[0], self.scale[1], self.scale[2]]
    };

    return data;
};

// Static function.
// Create object data from asset data
ObjectEdit.createData = function(asset) {

    var data = {
        name: asset.name,
        id: 0,
        visible: true,
        script: asset.script || null,
        physics: asset.physics || null, // TO-DO will have to do a deep copy since this is an object
        mesh: asset.mesh || null,
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1]
    };

    return data;
};

ObjectEdit.prototype.setVisual = function(visual) {
    var self = this;

    visual.name = self.name;
    visual.userData = self.id;
    self.visual = visual;
    self.updateVisual();
};

ObjectEdit.prototype.updateVisual = function() {
    var self = this;

    if(self.visual) {
        self.visual.position.fromArray(self.position);
        self.visual.rotation.fromArray(self.rotation);
        self.visual.scale.fromArray(self.scale);
        self.visual.visible = self.visible;
    }
};

ObjectEdit.prototype.setPosition = function(x, y, z) {
    var self = this;

    self.position[0] = x;
    self.position[1] = y;
    self.position[2] = z;
    self.updateVisual();
};

ObjectEdit.prototype.setRotation = function(x, y, z) {
    var self = this;

    self.rotation[0] = x;
    self.rotation[1] = y;
    self.rotation[2] = z;
    self.updateVisual();
};

ObjectEdit.prototype.setScale = function(x, y, z) {
    var self = this;

    self.scale[0] = x;
    self.scale[1] = y;
    self.scale[2] = z;
    self.updateVisual();
};

ObjectEdit.prototype.setVisible = function(visible) {
    var self = this;

    self.visible = visible;
    self.updateVisual();
};
function VehicleConstructor(name, wheels, passengers, speed) {
  this.name = name;
  this.wheels = wheels;
  this.passengers = passengers;
  this.speed = speed;
  this.vin = Math.floor(Math.random() * 99999999);
}

VehicleConstructor.prototype.makeNoise = function() {
  console.log(this.noise);
};

VehicleConstructor.prototype.move = function() {
  this.updateDistanceTravelled();
  this.makeNoise();
  return this;
};

VehicleConstructor.prototype.checkMiles = function() {
  console.log(this.distance_travelled);
  return this;
};

VehicleConstructor.prototype.updateDistanceTravelled = function() {
  this.distance_travelled += this.speed;
  return this;
};

VehicleConstructor.prototype.noise = "Generic Noise!";
VehicleConstructor.prototype.distance_travelled = 0;

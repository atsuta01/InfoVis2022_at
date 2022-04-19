class Vec3
{
    constructor( x, y, z )
    {
	this.x = x;
	this.y = y;
	this.z = z;
    }

    add( v )
    {
	this.x += v.x;
	this.y += v.y;
	this.z += v.z;
	return this;
    }

    sub( v )
    {
	this.x -= v.x;
	this.y -= v.y;
	this.z -= v.z;
	return this;
    }

    sum()
    {
	return this.x + this.y + this.z;
    }

    min()
    {
	//return Math.min( this.x, this.y, this.z );
	const m =  this.x < this.y ? this.x : this.y;
	return m < this.z ? m : this.z;
    }

    max()
    {
	//return Math.max( this.x, this.y, this.z );
	const m = this.x > this.y ? this.x : this.y;
	return m > this.z ? m : this.z;
    }

    mid()
    {
	return this.sum() - this.min() - this.max();
    }

    cross( v )
    {
	var x = this.x, y = this.y, z = this.z;
	this.x = y * v.z - z * v.y;
	this.y = z * v.x - x * v.z;
	this.z = x * v.y - y * v.x;
	return this;
    }

    length()
    {
	return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }

    AreaOfTriangle( v1, v2, v3 )
    {
	var b1 = v2.x - v1.x;
	var b2 = v2.y - v1.y;
	var b3 = v2.z - v1.z;

	var c1 = v3.x - v1.x;
	var c2 = v3.y - v1.y;
	var c3 = v3.z - v1.z;

	var S =  Math.sqrt( (b1*c2 - b2*c1)** + (b2*c3 - b3*c2)** + (b3*c1 - b1*c3)**) * 0.5;

	return S;
    }
}

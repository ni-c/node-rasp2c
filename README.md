# node-rasp2c

node-module for I2C communication with the Raspberry PI

 * [Installation](#installation)
 * [Usage](#usage)
 * [License](#license)
 
## Installation

### Install node.js on your Raspberry PI

Download and compile the latest version of node.js:

````bash
$ wget http://nodejs.org/dist/v0.8.19/node-v0.8.19.tar.gz
$ tar -zxf node-v0.8.19.tar.gz
$ cd node-v0.8.19/
$ ./configure
$ make
$ sudo make install
````

#### Install rasp2c module

To install the rasp2c module, change in your project directory and type: 

````bash
$ npm install rasp2c
````

### Prepare the Raspberry PI for I2C communication

#### Activate I2C kernel module

Edit the file `/etc/modprobe.d/raspi-blacklist.conf`

````bash
$ sudo vi /etc/modprobe.d/raspi-blacklist.conf
````

Search for the row

````
blacklist i2c-bcm2708
````

and comment it
````
#blacklist i2c-bcm2708
````

Leave the editor (with `:wq!`)

#### Load I2C kernel modules

Load the required kernel modules

````bash
$ modprobe i2c-bcm2708
$ modprobe i2c_dev
````

Use `lsmod` to check, if the modules are loaded.

````bash
$ lsmod
Module                  Size  Used by
nfsd                  236425  11
i2c_dev                 5587  20
i2c_bcm2708             3542  0
snd_bcm2835            19889  0
snd_pcm                74834  1 snd_bcm2835
snd_seq                52536  0
snd_timer              19698  2 snd_seq,snd_pcm
snd_seq_device          6300  1 snd_seq
snd                    52489  5 snd_seq_device,snd_timer,snd_seq,snd_pcm,snd_bcm2835
snd_page_alloc          4951  1 snd_pcm
````

To load the modules automatically on boot, you can add them to the `/etc/modules` file.

````bash
$ sudo vi /etc/modules

snd_bcm2835
i2c-bcm2708
i2c-dev
````

#### Install I2C tools

Install the i2c-tools

````bash
$ sudo apt-get install i2c-tools
````

Add your user to the i2c usergroup so you don't need to use sudo to interact with the i2c device.

````bash
sudo usermod -aG i2c pi
````

## Usage

````js
var rasp2c = require('rasp2c');

// Detect devices on the I2C Bus
rasp2c.detect(function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// Dump the addresses 0x11 - 0x15 of the I2C device at address 0xa1 on the I2C bus
rasp2c.dump('0xa1', '0x11-0x15', function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

// Set the address 0x11 of the I2C device at address 0xa1 on the I2C bus to 0xff
rasp2c.set('0xa1', '0x11', '0xff', function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

````

## License

rasp2c is released under two licenses: new BSD, and MIT. You may pick the
license that best suits your development needs. The text of both licenses are
provided below.

### The "New" BSD License:

Copyright (c) 2013, Willi Thiel
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
  * Neither the name of the Dojo Foundation nor the names of its contributors
    may be used to endorse or promote products derived from this software
    without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### MIT License

Copyright (c) 2013, Willi Thiel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
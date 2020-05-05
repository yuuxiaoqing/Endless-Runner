Dim Sum Run by Angela Jiang, Xiao Qing Yu, Nikolas Sanchez
May 4, 2020
Credits:
Music(CC): Shenyang by Kevin MacLeod -> Link: https://incompetech.filmmusic.io/song/4346-shenyang
Ishikari Lore by Kevin MacLeod -> Link: https://incompetech.filmmusic.io/song/3929-ishikari-lore
License: http://creativecommons.org/licenses/by/4.0/
Creative Tilt (Technical):
    - For our game we wanted to our player to run around a circle. To do this we needed the illusion
    of the table constantly spinning in circles. Phaser had one (as far was we discovered) function
    to let us do that and that was velocityFromRotation(). So we set these up so that the plates
    spun around the table and starts at 4 different angles. On top of that, apparently there was
    a problem with the Phaser Arcade physics that didn't either A) didn't allow the player to jump
    (happens when using collide in update) or B) didn't reset the players jump (happens when using 
    collider). To remedy this we had to create a new system by creating a sprite that followed
    the player.
    -Our chopsticks were also a challenge, we had to figure out how to create chopsticks at
    random locations so we figured that out too. To increase the challenge we increased the
    chopsticks at a certain interval.
    - look for CTTECH in comments for the code.
Creative Tilt (Art):
    - Angela made the art and it makes me hungry
    - The bao is cute look at him
    - i wanna eat it
    - this is niko writing this comment
    - delicious.
    - Also we made the visual style related to food and it also rotates in a circle
    - like a real dimsum table

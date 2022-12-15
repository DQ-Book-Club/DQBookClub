import { NextPage } from "next";

const NotesPage: NextPage = ({}) => (
  <div className="main">
    <h1>iPhone Photography</h1>

    <progress max="12" value="9"></progress>

    <div className="current-assignment">
      <b>The current assignment is:</b>
      <div>A black and white photo</div>
      <div>A photo with prominent shadows</div>
      <div>A photo edit of the picture send on the group chat</div>
    </div>

    <details>
      <summary>Chapter 1 - Essentials</summary>
      <blockquote cite="https://learning.oreilly.com/library/view/the-iphone-photography/9781681986937/Text/chapter26.xhtml">
        Some of the work people are creating out there on their iPhone cameras
        is absolutely stunning. You have the camera that can do that. The only
        thing standing between you and those images isn't technology, it's you.
        Your intent makes the difference.
      </blockquote>
      <ul>
        <li>
          Tap on the an object to <em>focus</em> on it. Tap and hold on the
          screen to lock focus and exposure.
        </li>
        <li>
          Hold your camera still by tucking your arms in, or leaning on
          something.
        </li>
        <li>Turn the built-in flash off permanently.</li>
        <li>
          Don't pinch to zoom (aka "digital zoom"). Use one of your phone's
          built in lenses by clicking on the x1, x0.5 or x2 buttons
        </li>
        <li>
          If yor picture is too dark it's "underexposed". If it's too bright
          it's "overexposed". You can control exposure in the camera app after
          focusing by dragging up or down.
        </li>
        <li>There's a RAW format that, in general, we won't use.</li>
        <li>
          You can get as close to 3 inches without your subject being out of
          focus. (close up images are sometimes called Macro Shots)
        </li>
        <li>
          If you feel that your white-balance is off, put a white piece of paper
          in front of the camera and focus on it. (Or use a 3rd party app like
          Lightroom)
        </li>
        <li>
          If your subject is moving, use <em>Burst mode</em> by swiping left on
          the shutter button and choosing the best image.
        </li>
        <li>
          Tip for ultra-wide shots: take them from really low or really high.
        </li>
        <li>
          You can get to your camera from the lock screen by swiping left.
        </li>
        <li>The more light, the better the photo!</li>
      </ul>
    </details>

    <details>
      <summary>Chapter 2 - Photo Composition</summary>
      <blockquote>
        Don't just take one or two shots, shrug your shoulders, and move on.
        Take your time. Put your phone down and just look at the scene. Is there
        someplace you could be standing that would make the view more
        interesting? Is there some angle, some view, some type of composition
        where everything just comes together and the scene looks great? Your job
        is to find that angle, that view, that composition, and when you do,
        you'll see it literally all come together in a killer shot.
      </blockquote>
      <ul>
        <li>
          <strong>Don't put your subject in the middle.</strong> It's very
          boring.
        </li>
        <li>
          <strong>Work the scene.</strong> Try different angles, lenses, and
          positions.
        </li>
        <li>
          <strong>Border patrol:</strong> make sure there's no junk at the edges
          of your photo.
        </li>
        <li>
          <strong>Less is more.</strong> More things in the shot end up
          distracting from the subject. Remove things from the shot.
        </li>
        <li>
          <strong>Add perspective.</strong> Low angles make things look bigger,
          while high angles makethings look smaller.
        </li>
        <li>
          <strong>Leading lines</strong> are lines in your image that lead the
          eye to the subject.
        </li>
        <li>Avoid bright spots in the background.</li>
        <li>
          Use the <strong>rule of thirds.</strong> Need help? Turn it on with{" "}
          <em>Settings &gt; Camera &gt; Composition &gt; Grid.</em>
        </li>
        <li>
          <strong>Get closer to your subject.</strong> Fill the frame with your
          subject.
        </li>
        <li>
          With cityscapes, landscapes, and other scenic views, create layers to
          add depth to your photo and draw the viewer into the image
        </li>
        <li>
          Look for <strong>natural frames</strong>.
        </li>
        <li>
          You can only show the most interesting part of the subject if you
          want. The viewer will fill in the rest automatically.
        </li>
        <li>
          Keep your eyes peeled for <strong>patterns</strong>, and if you see a{" "}
          <strong>pattern interrupted</strong>, you know you're taking it up a
          notch.
        </li>
        <li>
          Compose the shot with a lot of <strong>negative space</strong> to lead
          your viewer to your subject.
        </li>
        <li>
          People like an <strong>odd number</strong> more than an even number.
        </li>
        <li>
          If your subject is moving towards a direction, make sure your subject
          has <strong>space in front</strong> of it.
        </li>
        <li>
          Create balance in your image by having contrasting size, shape, of
          multiple objects.
        </li>
        <li>
          There's a special rule for <strong>symmetry</strong>: take the photo
          in the only angle in which the left and right side are almost
          identical
        </li>
      </ul>
    </details>

    <details>
      <summary>Chapter 3 - Photographing People</summary>
      <ul>
        <li>
          <strong>Shoot in Portrait mode</strong> to get that separation,
          simplicity, and out-of-focusness
        </li>
        <li>
          <strong>Aim:</strong> hold the phone out and up over their head, aim
          it down, and look up at the camera
        </li>
        <li>
          <strong>Focus:</strong> focus on your subject's eyes
        </li>
        <li>
          Ideal place for your subject's eyes to appear is about 1/3 of the way
          from the top of the image
        </li>
        <li>Fill the frame with your subject</li>
        <li>
          <strong>Cut off the top of the head</strong>, like 1/3 of the hair or
          head to make it look intentional
        </li>
        <li>Don't leave too much space above the head</li>
        <li>Avoid cropping at limbs, losing fingers, etc.</li>
        <li>Get a softer and more blurred background</li>
        <li>Keep the background clean, simple, and uncluttered</li>
        <li>
          <strong>Use north facing windows</strong> for soft, diffused, magical
          light
        </li>
        <li>
          <strong>Window techniques</strong>
          <ul>
            <li>
              <strong>Back away from the window</strong> enough to be lit, but
              not directly under the light
            </li>
            <li>
              <strong>Move behind the window</strong>
            </li>
            <li>
              <strong>Face away from the window</strong> for a "half-lit" face
            </li>
            <li>
              <strong>Light the shadow side of the face</strong>, like with a
              reflector
            </li>
          </ul>
        </li>
        <li>
          Turn any window into a beautiful light source with translucent shower
          liner
        </li>
        <li>Turn off the room lights</li>
        <li>Avoid direct sunlight</li>
        <li>
          In the sunlight, place your subject's back toward the sun then focus
          and raise the exposure for their face
        </li>
        <li>Avoid "dappled light" under trees</li>
        <li>Use a 1-stop diffuser between the subject and the sun</li>
        <li>
          <strong>Shoot during "golden hour"</strong> i.e. an hour or so before
          sunset
        </li>
        <li>
          <strong>Sun flare look:</strong> have the subject's back to the sun
          then have the sun "touch" something in the image
        </li>
        <li>
          <strong>Reflectors</strong>
          <ul>
            <li>Hold reflectors up high, not low</li>
            <li>
              <strong>White:</strong> reflect some light
            </li>
            <li>
              <strong>Silver:</strong> reflect a lot of light
            </li>
            <li>
              <strong>Gold:</strong> for shooting outdoors during golden hour
            </li>
            <li>
              <strong>Black:</strong> add nice shadows to the face
            </li>
          </ul>
        </li>
        <li>
          Shooting on <strong>cloudy days</strong> rock
        </li>
        <li>
          Use <strong>built-in lighting effects</strong> in Portrait mode
        </li>
      </ul>
    </details>

    <details>
      <summary>Chapter 4 - Posing People</summary>
      <ul>
        <li>Wear solid solors</li>
        <li>Get couples really close</li>
        <li>
          <strong>Look up at the sun</strong> for a hopeful, peaceful, happy,
          hopeful look
        </li>
        <li>
          <strong>Turn the shoulder</strong> to look smaller and slimmer
        </li>
        <li>
          <strong>"Peter's Jawline" trick</strong> - stick your head out forward
          then tilt it down a bit
        </li>
        <li>
          <strong>Bend the limbs</strong> a bit, don't be stiff
        </li>
        <li>Look away from the camera for a "fashiony" looks</li>
        <li>
          <strong>"Short lighting"</strong> - turn the head towards the camera
          and the shadows help the face look longer
        </li>
        <li>Shoot from down low for full body shots</li>
        <li>
          For longer and slender looking legs, cross one leg in front of the
          other and put their weight on the back foot
        </li>
        <li>Roll the shoulders back</li>
        <li>
          <strong>Give the hands something to do</strong>, like hold something
        </li>
        <li>
          <strong>"Knee pop" pose</strong> rules
        </li>
        <li>Subjects with tucked arms look wider and bent arms look trimmer</li>
      </ul>
    </details>

    <details>
      <summary>Chapter 5 - Travel & Landscape Photography</summary>

      <ul>
        <li>
          <strong>Best times to shoot landscapes/travel? Dawn</strong>. Also
          right when the sun sets, but you're more likely to get a bunch of
          tourists in the shot. Cloudy days look better than sunny days.
        </li>
        <li>
          Something worth capturing may not last long enough for you to get the
          best compisition.
          <br />
          <strong>Don't miss the moment.</strong> You can always fix the
          composition later.
        </li>
        <li>
          Go on a 2 hour tour of the city and take photosof places you want to
          return to (this is called <strong>Location scouting</strong>). You can
          see the GPS coordinates of your photos in the Photos app. <br />
          Turn this feature on in{" "}
          <code>
            Settings {">"} Privacy {">"} Location Services
          </code>{" "}
          scroll to <code>Camera</code> and choose{" "}
          <code>While Using the App</code>
        </li>
        <li>
          <strong>Rule of thirds for horizon lines</strong>: put the horizon on
          the bottom third line or the top third line depending on whether the
          sky or foreground is more interesting.
          <br />
          Turn on the grid with{" "}
          <code>
            Settings {">"} Camera {">"} Grid
          </code>
        </li>
        <li>
          Do your research ahead of time! Use{" "}
          <a href="https://500px.com/">500px</a> and{" "}
          <a href="https://www.pinterest.com/">Pinterest</a> are two recommended
          sites.
        </li>
        <li>
          You only get good reflections in water when there's no wind. There's
          no wind at dawn!
        </li>
        <li>
          The best way to show size and scale of your subject is to put
          something in the scene next to it.
        </li>
        <li>
          <strong>How to get good food pics</strong>
          <ul>
            <li>
              Ask to be seated outside, or by a window. This is where the best
              light is.
            </li>
            <li>
              Turn on Portrait mode. Stand up and back away until you see{" "}
              <code>Natural Light</code> appear. Now shoot down at the food or
              get low to make the food look big.
            </li>
            <li>
              Shoot a straight shot down. Your phone can help you! Two{" "}
              <code>+</code> signs appear, and when you line them up, you're
              leveled.
            </li>
          </ul>
        </li>
      </ul>
    </details>

    <details open>
      <summary>Chapter 6 - Cool things to shoot</summary>

      <ul>
        <li>
          When shooting <strong>Panoramas</strong>:
          <ul>
            <li>Go slowly, and make sure you're following the line.</li>
            <li>Short panoramas are better than long ones</li>
            <li>Remember that you are communicating a sense of scale.</li>
            <li>
              Don't forget about <em>vertical panoramas!</em>
            </li>
            <li>
              Make sure nothing is moving while you are shooting. It will be
              distorted.
            </li>
            <li>
              You can take a 360 degree panorama that includes you in about 5-6
              seconds. (That breaks the first rule but... whatever)
            </li>
          </ul>
        </li>
        <li>
          Try out the <strong>time lapse</strong> feature. Longer timelapses
          look better than short ones.
        </li>
        <li>
          If you're selling a product:
          <ol>
            <li>Clean the product thoroughly</li>
            <li>Set up a blank background with drapes, a winter coat, etc.</li>
            <li>
              Compose your image such that there are little to no relfections.
              <br />
              If there's a little reflection, you can edit it out in Lightroom
              (more later).
            </li>
            <li>Create an image collage using an app like PicStitch</li>
          </ol>
        </li>
        <li>
          When shooting <strong>architechture</strong>:
          <ul>
            <li>
              try aiming your camera straight up toward the tops of the
              buildings
            </li>
            <li>
              If you can find a spot where three or four buildings are in close
              proximity, this will look even better.
            </li>
            <li>
              you don't have to show the entire building in the shot and, in
              fact, I usually find it more interesting to show just an
              interesting portion of a building than to try to get the whole
              thing in the frame.{" "}
            </li>
            <li>
              when it comes to architecture, it's like nearly every other genre
              of photography—it looks better in great light. So, if you shoot
              early in the morning and late in the day, the light will look
              better and so will your shots.
            </li>
          </ul>
        </li>
        <li>
          Tips for <strong>Sports Pictures</strong>:
          <ul>
            <li>
              You need quick shutter speed (a lot of light) in order to get a
              nice freeze frame of the action.
            </li>
            <li>
              You likely can't get close, so crop. Crop more than you think.
            </li>
            <li>
              Show the peak of the action. Ball about to hit the bat, etc.
            </li>
            <li>
              2 eyes and a ball. Shoot the players coming toward you. If you
              have the athlete's eyes and the ball, it's probably a decent
              photo.
            </li>
          </ul>
        </li>
        <li>
          For <strong>Still Life</strong>photos
          <ul>
            <li>
              Soft, directional light is what will make your still life sing,
              and one thing you can do to help make that happen is to soften the
              light.
            </li>
            <li>
              {" "}
              you generally don't want to shoot down from a higher angle on your
              still life, so get your iPhone down low, so you are shooting
              across at it near the same basic height, or just slightly above it
            </li>
            <li>
              keep your scene simple. Don't put too much into your scene, and
              don't let it get cluttered with too many items
            </li>
          </ul>
        </li>
        <li>
          Do you have Smart HDR on? Check in{" "}
          <code>Settings &gt; Camera &gt; Smart HDR</code>. HDR takes 3 photos
          and stitches with different exposures, then stitches them together to
          get high dynamic range.
          <br /> If you have Smart HDR off, you can toggle HDR on and off in the
          camera app.
        </li>
      </ul>
    </details>
  </div>
);

export default NotesPage;

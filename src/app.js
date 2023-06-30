let playlist = [ {
    'title': ' Ooru Palletooru',
    'audio': "assets/sample2.mp3",
  } ,
  {
    'title': 'Seheri ',
    'audio': "assets/sample3.mp3",  
  },
  {
    'title': '06 - Assalaam Valekhum',
    'audio': "assets/sample4.mp3",  
  },
  {
    'title': '07_-_Chinnadho',
    'audio': "assets/sample5.mp3",  
 },
 {
    'title':' 09 - Light Theesko',
    'audio':"assets/sample6.mp3"
 },
 {
    'title':' 10 - Ila Choodu',
    'audio':"assets/sample7.mp3"
 },
 {
    'title':'  Yeppatiki ',
    'audio':"assets/sample8.mp3"
 },
 {
    'title':' Badulu Tochani ',
    'audio':"assets/sample9.mp3"
 },
 {
    'title':' Ninna Leni ',
    'audio':"assets/sample10.mp3"
 },
 {
    'title':' Aggipulla Lanti ',
    'audio':"assets/sample11.mp3"
 },
 {
    'title':' Prema Pusene ',
    'audio':"assets/sample12.mp3"
 },
 {
    'title':' Ooruko Hrudayama ',
    'audio':"assets/sample13.mp3"
 },
 {
    'title':' Anandaley Kannullona ',
    'audio':"assets/sample14.mp3"
 },
 {
    'title':' Akasham Baddalaina ',
    'audio':"assets/sample15.mp3"
 },
 {
    'title':' Veyi Kannulatho ',
    'audio':"assets/sample16.mp3"
 },
 {
    'title':'Agarottula ',
    'audio':"assets/sample17.mp3"
 },
  {
    'title':' Evadu Evadu ',
    'audio':"assets/sample18.mp3"
 },
 {
    'title':'Mora Vinara ',
    'audio':"assets/sample19.mp3"
 },
 {
    'title':'  Dol Dol Dol ',
    'audio':"assets/sample20.mp3"
 },
 {
    'title':' Rao Gari Abbayi ',
    'audio':"assets/sample21.mp3"
 },
 {
    'title':' Pillaa Raa ',
    'audio':"assets/sample22.mp3"
 },
 {
    'title':' Kontha Kalam Kindata ',
    'audio':"assets/sample23.mp3"
 },
 {
    'title':'  Ennosarlu ',
    'audio':"assets/sample24.mp3"
 },
 {
    'title':'Chali Chaliga ',
    'audio':"assets/sample25.mp3"
 },
 {
    'title':'Bang Bang',
    'audio':"assets/sample26.mp3"
 },
 



    ];
  i = 0;
  n = playlist.length;
  let player = document.getElementById( 'player' );
  let dur = document.getElementById( 'dur' );
  playlist.forEach( function( i ) {
    console.log( i.audio )
    player.src = i.audio;
    $( '.title' ).html( i.title );
  }, );
  
  function calculateTotalValue( length ) {
    let minutes = Math.floor( length / 60 ),
      seconds_int = length - minutes * 60,
      seconds_str = seconds_int.toString( ),
      seconds = seconds_str.substr( 0, 2 ),
      time = minutes + ':' + seconds
    return time;
  }
  
  function calculateCurrentValue( currentTime ) {
    let current_hour = parseInt( currentTime / 3600 ) % 24,
      current_minute = parseInt( currentTime / 60 ) % 60,
      current_seconds_long = currentTime % 60,
      current_seconds = current_seconds_long.toFixed( ),
      current_time = ( current_minute < 10 ? "0" + current_minute : current_minute ) + ":" + ( current_seconds < 10 ? "0" + current_seconds : current_seconds );
    return current_time;
  }
  
  function initProgressBar( ) {
    let length = player.duration;
    let current_time = player.currentTime;
    let totalLength = calculateTotalValue( length )
    jQuery( ".end-time" ).html( totalLength );
    let currentTime = calculateCurrentValue( current_time );
    jQuery( ".start-time" ).html( currentTime );
    dur.value = player.currentTime;
    if ( player.currentTime == player.duration ) {
      $( "#play-btn" ).fadeIn( "slow", function( ) {
        $( this ).removeClass( "fa-pause" );
        $( this ).addClass( "fa-play" );
        dur.value = 0;
      } );
    }
  };
  
  function mSet( ) {
    player.currentTime = dur.value;
  }
  
  function mDur( ) {
    let length = player.duration;
    dur.max = length;
  }
  
  function initPlayers( num ) {
    for ( let i = 0; i < num; i++ ) {
      ( function( ) {
        let playerContainer = document.getElementById( 'player-container' ),
          player = document.getElementById( 'player' ),
          isPlaying = false,
          playBtn = document.getElementById( 'play-btn' );
        if ( playBtn != null ) {
          playBtn.addEventListener( 'click', function( ) {
            togglePlay( )
          } );
        }
  
        function togglePlay( ) {
          if ( player.paused === false ) {
            player.pause( );
            isPlaying = false;
            $( "#play-btn" ).fadeIn( "slow", function( ) {
              $( this ).removeClass( "fa-pause" );
              $( this ).addClass( "fa-play" );
            } );
          }
          else {
            player.play( );
            $( "#play-btn" ).fadeIn( "slow", function( ) {
              $( this ).removeClass( "fa-play" );
              $( this ).addClass( "fa-pause" );
            } );
            isPlaying = true;
          }
        }
      }( ) );
    }
  }
  $( "#next" ).data( 'dir', 1 );
  $( "#prev" ).data( 'dir', -1 );
  $( '#next, #prev' ).on( 'click', function( ) {
    i = ( i + $( this ).data( 'dir' ) + n ) % n;
    console.log( i );
    player.src = playlist[ i ].audio;
    $( '.title' ).html( playlist[ i ].title );
    $( '#play-btn' ).removeClass( "fa-play" );
    $( '#play-btn' ).addClass( "fa-pause" );
    player.play( );
  } );
  $( ".audio-player" )
    .toArray( )
    .forEach( function( player ) {
      let audio = $( player ).find( "audio" )[ 0 ];
      let volumeControl = $( player ).find( ".volumeControl .wrapper" );
      volumeControl.find( ".outer" ).on( "click", function( e ) {
        let volumePosition = e.pageX - $( this ).offset( ).left;
        let audioVolume = volumePosition / $( this ).width( );
        if ( audioVolume >= 0 && audioVolume <= 1 ) {
          audio.volume = audioVolume;
          $( this )
            .find( ".inner" )
            .css( "width", audioVolume * 100 + "%" );
        }
      } );
    } );
  $( function( ) {
    // Dropdown toggle
    $( '.dropdown-toggle' ).click( function( ) {
      $( this ).next( '.dropdown' ).slideToggle( "fast" );
    } );
    $( document ).click( function( e ) {
      var target = e.target;
      if ( !$( target ).is( '.dropdown-toggle' ) && !$( target ).parents( ).is( '.dropdown-toggle' ) ) {
        $( '.dropdown' ).hide( );
      }
    } );
  } );
  $( '#darkButton' ).click( switchDark );
  $( '#whiteButton' ).click( switchWhite );
  $( '#blueButton' ).click( switchBlue );
  
  function switchDark( ) {
    $( '#skin' ).attr( 'class', 'dark audio-player' );
    $( '.inner' ).css( 'background', '#fff' );
    $( '.title' ).css( 'color', '#fff' );
    $( '.time' ).css( 'color', '#fff' );
    $( '.fa-volume-up' ).css( {
      'color': '#fff'
    } );
    $( '.audio-player #play-btn' ).css( {
      'color': '#fff',
      'border-color': '#fff'
    } );
    $( '.ctrl_btn' ).css( {
      'color': '#fff',
      'border-color': '#fff'
    } );
  }
  
  function switchWhite( ) {
    $( '#skin' ).attr( 'class', 'white audio-player' );
    $( '.inner' ).css( 'background', '#555' );
    $( '.title' ).css( 'color', '#555' );
    $( '.time' ).css( 'color', '#555' );
    $( '.fa-volume-up' ).css( {
      'color': '#555'
    } );
    $( '.audio-player #play-btn' ).css( {
      'color': '#555',
      'border-color': '#555'
    } );
    $( '.ctrl_btn' ).css( {
      'color': '#555',
      'border-color': '#555'
    } );
  }
  
  function switchBlue( ) {
    $( '#skin' ).attr( 'class', 'blue audio-player' );
    $( '.inner' ).css( 'background', '#fff' );
    $( '.title' ).css( 'color', '#fff' );
    $( '.time' ).css( 'color', '#fff' );
    $( '.fa-volume-up' ).css( {
      'color': '#fff'
    } );
    $( '.audio-player #play-btn' ).css( {
      'color': '#fff',
      'border-color': '#fff'
    } );
    $( '.ctrl_btn' ).css( {
      'color': '#fff',
      'border-color': '#fff'
    } );
  }
  initPlayers( jQuery( '#player-container' ).length );
  

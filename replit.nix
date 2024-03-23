{ pkgs }: {
    deps = [

        pkgs.nodejs-18_x
        #pkgs.libwebp
	      pkgs.nodePackages.typescript
        pkgs.ffmpeg
        pkgs.imagemagick  
        pkgs.wget
        pkgs.git
        pkgs.nodePackages.pm
  ];
}

module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
    
        
        watch:{
           
            html:{
	            options:{
		            livereload:true
	            },
	            files:'*.html',
	            tasks: ['build']
            },
            
        	scripts:{
        		options:{
	        		livereload:true
        		},
	        	files: ['js/*.js'],
	        	tasks:['build']
        	},
        	
        	css:{
	        	options:{
	        		livereload:true
        		},
	        	files: ['css/*.css'],
	        	tasks:['build']
        	},
        	
           
        	stylus:{
        	    tasks:['build'],
		        files:['stylus/*.styl', 'index.html'],
		        options:{
			        spawn: false,
			        livereload: true,
			         use:['nib'],
	                    paths: [
	                        "node_modules/grunt-contrib-stylus/node_modules",
	                        "node_modules/jeet/stylus"
	                    ]
		             
		        }
	        },
	        
	      
        },

        stylus: {
             compile:{
	             options:{
	             	 spawn: false,
			         livereload: true,
		             use:['nib'],
	                    paths: [
	                        "node_modules/grunt-contrib-stylus/node_modules",
	                        "node_modules/jeet/stylus"
	                    ]
		             },
					 
					 files:{
						 'css/core.css':'stylus/core.styl'
					 }
	             
             }
                
        },
        
        useminPrepare:{
	        
	        html: '*.html' ,
	        options:{
	        
		    	dest:'build/dist'
		    	 
	        }
	        
           },
		   
		  concat:{
			  dist:{
				  src:'js/*.js',
				  dest:'build/dist/js/main.js'
			  }
		  } ,
		  
		  
		  uglify:{
			build:{
				files:{
					'build/dist/js/main.js':'build/dist/js/main.js'
				}
			}
			  
		  },
       
         
         usemin:{
	       html:['build/dist/*.html']  
         },
	   

        copy:{
	        task0:{
		        src: '*.html',
		        dest:'build/dist/'
	        },
	        task1:{
		      src:'video/*.mp4',
		      dest:'build/dist/',  
	        },
	        task2:{
		      src: 'img/*',
		      dest:'build/dist/',  
	        },
	        vendorScripts:
	   	    
	   	    	{
	   	    		src:'js/vendor/*',
	   	    		dest:'build/dist/',
	   	    		
	   			},
        },
               
        clean:['build'],
        
        rev:{
	        files:{
		        src:['build/dist/js/main.js', 'build/dist/css/core.css']
	        }
        },
        
  
   
        

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
	grunt.registerTask('build',['stylus','clean','copy:task0','copy:task1','copy:task2','useminPrepare','concat','cssmin','uglify:build','rev','copy:vendorScripts','usemin']);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

};
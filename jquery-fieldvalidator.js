/**
 * jQuery-FieldValidator
 * Version: 1.0
 * Build Date: 2013-04-28
 * Copyright (c) 2013, Charles Ross (https://github.com/charleshross). All rights reserved.
 * License: Private Software
 * Website: https://github.com/charleshross/
 * Prerequisites : jQuery, Date.js
 */

(function( $ ) {
	$.fn.newaccount = function( options ) {
		
		// Proper Email Validation (http://www.regular-expressions.info/email.html)
		function proper_email(email) {
			
			char_regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)";
			filter = new RegExp(char_regex,'i');
			
			if (filter.test(email)) {
				return true;
			} else {
				return false;
			}
			
		}
		
		// Sentance Case Function
		function ucfirst(string)
		{
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}
		
		// Password Strength Function
		function pass_strength(password) {
			var ok = 0; 
			//- Upper case letters 
			if (password.match(/[A-Z]/)) ok++;
			
			//- Lower case letters 
			if (password.match(/[a-z]/)) ok++;
			
			//- Digits 
			if (password.match(/[0-9]/)) ok++;
			
			//- Special characters (!, @, $, %, etc.) 
			if (password.match(/[@#$%&!*)(-+=^_]/)) ok ++;
			
			//- Special characters (!, @, $, %, etc.) 
			if (password.length > 7) ok ++;
			
			if (ok > 3) { 
				return true;
			} else { 
				return false;
			}
		}
		
		// Age Check
		function age_check(birthdate,limit) {
			
			// Adult Date Calculation
			var minimum_age = limit * -365;
			var date_adult = Date.today().add(minimum_age).days();
			var date_adult_iso = date_adult.toString('yyyy-MM-dd');
			
			var date_selected = Date.parse(birthdate);
			var date_selected_iso = date_selected.toString('yyyy-MM-dd');
		
			if (date_selected_iso <= date_adult_iso) {
				return true;
			} else {
				return false;
			}
			
		}
		
		// Strict Chars Test
		function strict_chars(char_test,regex) {
			
			char_regex = regex;
			bad_chars = new RegExp(char_regex);
			
			if (char_test.search(bad_chars) === -1) {
				return true;
			} else {
				return false;
			}
			
		}
		
		// Fetching and Capitalizing Element's name
		var name = ucfirst(this.attr('name'));
		
		// Settings
		var settings = $.extend( {
			// Name of field
			'name' : name,
			// Value of field
			'value' : this.val(),
			// Field Required?
			'required' : true,
			// Text -> Required Error
			'error_required' : false,
			// Message container element
			'message_container' : false,
			// Message label element
			'message_label' : false,
			// Text -> Success
			'message_success' : 'Success!',
			// Text -> Invalid Email
			'error_invalidemail' : 'Email is invalid',
			// Text -> Weak Password
			'error_weakpassword' : 'Password not strong enough',
			// Type of field
			'type' :  false,
			// Hide error message on val=empty?
			'reset' : false,
			// Alert messages instead of error messages?
			'alert' : false,
			// Min Length
			'min' : false,
			// Max Length
			'max' : false,
			// No Sucess Message
			'quiet_success' : false,
			// Age Checker
			'age_limit' : false,
			// Text -> Age Error
			'error_agecheck' : false,
			// Text -> Error Min/Max
			'error_minmax' : false,
			// Text -> Error Min Only
			'error_min' : false,
			// Text -> Error Max Only
			'error_max' : false,
			// Strict Chars
			'strict_chars' : false,
			// Text -> Error Strict Chars
			'error_strictchars' : 'Only A-Z, a-z, 0-9, and \'-\' allowed',
			// Text -> Date Invalid
			'error_invaliddate' : 'Date is invalid',
			// Strict Char Regex
			'strict_char_regex' : "[^A-Za-z0-9-]",
			// Text -> Checkbox
			'error_checkbox' : 'You must agree to the terms'
		}, options);
		
		//////////////////////// Procedure Cases ////////////////////////
		
		// Required Check
		if (settings.required == true) {
			
			// On error = empty value
			if (!settings.value) {
				
				// Error Message
				if (!settings.error_required) {
					error_message = name + ' required!';
				} else {
					error_message = settings.error_required;
				}
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(error_message);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Show
					if (settings.reset == false) {
					
						// Change Error Message
						this.parent().find('.label').text(error_message);
						
						// Show Error Message
						this.parent().find(settings.message_container+':first').removeClass('success').addClass('error').show();
					
					// Hide
					} else if (settings.reset == true) {
						
						// Show Error Message
						this.parent().find(settings.message_container+':first').hide();
						
					}
					
				}
				
				return false;
				
			}
			
		}
		
		// Email Check
		if (settings.type == 'email') {
			
			// Invalid Email
			valid_email = proper_email(settings.value);
			
			if (!valid_email) {
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(settings.error_invalidemail);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Change Error Message
					this.parent().find('.label').text(settings.error_invalidemail);
					
					// Show Error Message
					this.parent().find(settings.message_container).removeClass('success').addClass('error').show();
					
				}
				
				return false;
				
			}
			
		}
		
		// Password Check
		if (settings.type == 'password') {
			
			valid_password = pass_strength(settings.value);
			
			if (!valid_password) {
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(settings.error_weakpassword);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Change Error Message
					this.parent().find('.label').text(settings.error_weakpassword);
					
					// Show Error Message
					this.parent().find(settings.message_container).removeClass('success').addClass('error').show();
					
				}
				
				return false;
				
			}
			
		}
		
		// Date Integrity Check
		if (settings.type == 'date') {
			
			var date_selected = Date.parse(settings.value);
			
			if (date_selected == null) {
				
				// Error Message
				error_message = settings.error_invaliddate;
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(error_message);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Change Error Message
					this.parent().find('.label').text(error_message);
					
					// Show Error Message
					this.parent().find(settings.message_container).removeClass('success').addClass('error').show();
					
				}
				
				return false;
				
			}
			
		}	
		
		// Age Check
		if (settings.age_limit) {
			
			valid_age = age_check(settings.value,settings.age_limit)
			
			// Error Message
			if (!settings.error_agecheck) {
				error_message = 'Over ' + settings.age_limit + ' years old only!';
			} else {
				error_message = settings.error_agecheck;
			}
			
			if (!valid_age) {
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(error_message);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Change Error Message
					this.parent().find('.label').text(error_message);
					
					// Show Error Message
					this.parent().find(settings.message_container).removeClass('success').addClass('error').show();
					
				}
				
				return false;
				
			}
			
		}
		
		// Checkbox Check
		if (settings.type == 'checkbox') {
			
			
			
		}
		
		// Min Check Only
		if (settings.min && !settings.max) {
			
			if (settings.value.length < settings.min) {
				
				// Error Message
				if (!settings.error_min) {
					error_message = 'Minimum ' + settings.min + ' characters';
				} else {
					error_message = settings.error_min;
				}
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(error_message);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Change Error Message
					this.parent().find('.label').text(error_message);
					
					// Show Error Message
					this.parent().find(settings.message_container).removeClass('success').addClass('error').show();
					
				}
				
				return false;
				
			}
			
		}
		
		// Max Check Only
		if (!settings.min && settings.max) {
			
			if (settings.value.length > settings.max) {
				
				// Error Message
				if (!settings.error_max) {
					error_message = 'Max ' + settings.max + ' characters';
				} else {
					error_message = settings.error_max;
				}
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(error_message);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Change Error Message
					this.parent().find('.label').text(error_message);
					
					// Show Error Message
					this.parent().find(settings.message_container).removeClass('success').addClass('error').show();
					
				}
				
				return false;
				
			}
			
		}
		
		// Min/Max Check
		if (settings.min && settings.max) {
			
			if (settings.value.length < settings.min || settings.value.length > settings.max) {
				
				// Error Message
				if (!settings.error_minmax) {
					error_message = settings.min + ' to ' + settings.max + ' characters required';
				} else {
					error_message = settings.error_minmax;
				}
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(error_message);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Change Error Message
					this.parent().find('.label').text(error_message);
					
					// Show Error Message
					this.parent().find(settings.message_container).removeClass('success').addClass('error').show();
					
				}
				
				return false;
				
			}
			
		}
		
		// Strict Chars
		if (settings.strict_chars) {
			
			valid_chars = strict_chars(settings.value,settings.strict_char_regex);
			
			if (!valid_chars) {
				
				// Error Message
				error_message = settings.error_strictchars;
				
				if (!settings.message_container || !settings.message_label) {
					
					if (settings.alert) {
						alert(error_message);
					}
					
				} else if (settings.message_container && settings.message_label) {
					
					// Change Error Message
					this.parent().find('.label').text(error_message);
					
					// Show Error Message
					this.parent().find(settings.message_container).removeClass('success').addClass('error').show();
					
				}
				
				return false;
				
			}
			
		}
		
		// Checkbox Off
		if (settings.type == 'checkbox') {
			
			// Checked
			if(!this.prop('checked')) {
				
				// Error Message
				error_message = settings.error_checkbox;
				
				// Show
				if (settings.reset == false) {
				
					// Change Error Message
					this.parent().find('.label').text(error_message);
					
					// Show Error Message
					this.parent().find(settings.message_container+':first').removeClass('success').addClass('error').show();
				
				// Hide
				} else if (settings.reset == true) {
					
					// Show Error Message
					this.parent().find(settings.message_container+':first').hide();
					
				}
				
				return false;
				
			}
			
		}
		
		// Duplication Check
		
		
		//////////////////////// Sucess ////////////////////////
		
		// Sucess Message
		if (settings.message_container && settings.message_label && !settings.quiet_success) {
			
			// Change Error Message
			this.parent().find('.label').text(settings.message_success);
			
			// Show Error Message
			this.parent().find(settings.message_container).removeClass('error').addClass('success').show();
		
		// Quiet Success
		} else if (settings.quiet_success) {
			
			// Hide Error Message
			this.parent().find(settings.message_container).hide();
			
		}
		
		return true;
		
		
		
		
	};
})( jQuery );
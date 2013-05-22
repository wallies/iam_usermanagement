<%--
	 Portions Copyrighted 2012 ForgeRock Inc
--%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<%@page info="Login" language="java"%>
	<%@taglib uri="/WEB-INF/jato.tld" prefix="jato"%>
	<%@taglib uri="/WEB-INF/auth.tld" prefix="auth"%>
	<jato:useViewBean className="com.sun.identity.authentication.UI.LoginViewBean">
		<%@page contentType="text/html" %>
		<head>
			<title><jato:text name="htmlTitle_Login" /></title>
			<%
				String ServiceURI = (String) viewBean.getDisplayFieldValue(viewBean.SERVICE_URI);
				String encoded = "false";
				String gotoURL = (String) viewBean.getValidatedInputURL(
						request.getParameter("goto"), request.getParameter("encoded"), request);
				String gotoOnFailURL = (String) viewBean.getValidatedInputURL(
						request.getParameter("gotoOnFail"), request.getParameter("encoded"), request);
				String encodedQueryParams = (String) viewBean.getEncodedQueryParams(request);
				if ((gotoURL != null) && (gotoURL.length() != 0)) {
					encoded = "true";
				}
			%>
			<link href="<%= ServiceURI%>/css/new_style.css" rel="stylesheet" type="text/css" />
			<!--[if IE 9]> <link href="<%= ServiceURI%>/css/ie9.css" rel="stylesheet" type="text/css"> <![endif]-->
			<!--[if lte IE 7]> <link href="<%= ServiceURI%>/css/ie7.css" rel="stylesheet" type="text/css"> <![endif]-->	
		  <link rel="stylesheet" href="styles/foundation.css" />
		  
		  <script src="scripts/libs/custom.modernizr.js"></script>
			<script language="JavaScript" src="<%= ServiceURI%>/js/auth.js" type="text/javascript"></script>
			<jato:content name="validContent">
				<script language="JavaScript" type="text/javascript">
					<!--
					var defaultBtn = 'Submit';
					var elmCount = 0;

					/**
					 * submit form with given button value
					 *
					 * @param value of button
					 */
					function LoginSubmit(value) {
						aggSubmit();
						var hiddenFrm = document.forms['Login'];

						if (hiddenFrm != null) {
							hiddenFrm.elements['IDButton'].value = value;
							if (this.submitted) {
								alert("The request is currently being processed");
							}
							else {
								this.submitted = true;
								hiddenFrm.submit();
							}
						}
					}
					-->
				</script>
			</jato:content>
		</head>
		<body onload="placeCursorOnFirstElm();">
			<div class="container_12">
				<div class="grid_4 suffix_8">
					<a class="logo" href="<%= ServiceURI%>"></a>
				</div>
				<div class="box clear-float">
					<div class="grid_3">
						<div class="product-logo"></div>
					</div>
					<div class="grid_9 left-seperator">
						<div class="box-content clear-float">
							<jato:content name="ContentStaticTextHeader">
								<h1><jato:getDisplayFieldValue name='StaticTextHeader' defaultValue='Authentication' fireDisplayEvents='true' escape='false'/></h1>
							</jato:content>
							<jato:content name="validContent">
								<auth:form name="Login" method="post" defaultCommandChild="DefaultLoginURL">
									<jato:tiledView name="tiledCallbacks"
													type="com.sun.identity.authentication.UI.CallBackTiledView">
										<script language="javascript" type="text/javascript">
											<!--
											elmCount++;
											-->
										</script>
										<jato:content name="textBox">
											<div class="row">
												<label for="IDToken<jato:text name="txtIndex" />">
													<jato:text name="txtPrompt" defaultValue="User name:" escape="false" />
													<jato:content name="isRequired">
														<img src="<%= ServiceURI %>/images/required.gif" alt="Required Field"
															 title="Required Field" width="7" height="14" />
													</jato:content>
												</label>
												<input class="textbox" type="text" name="IDToken<jato:text name="txtIndex" />" id="IDToken<jato:text name="txtIndex" />" value="<jato:text name="txtValue" />" />
											</div>
										</jato:content>
										<jato:content name="password">
											<div class="row">
												<label for="IDToken<jato:text name="txtIndex" />">
													<jato:text name="txtPrompt" defaultValue="Password:" escape="false" />
													<jato:content name="isRequired">
														<img src="<%= ServiceURI %>/images/required.gif" alt="Required Field"
															 title="Required Field" width="7" height="14" />
													</jato:content>
												</label>
												<input class="textbox" type="password" name="IDToken<jato:text name="txtIndex" />" id="IDToken<jato:text name="txtIndex" />" value="" />
											</div>
										</jato:content>
										<jato:content name="choice">
												<div class="row">
													<label for="IDToken<jato:text name="txtIndex" />">
														<jato:text name="txtPrompt" defaultValue="RadioButton:" escape="false" />
														<jato:content name="isRequired">
															<img src="<%= ServiceURI %>/images/required.gif" alt="Required Field"
																 title="Required Field" width="7" height="14" />
														</jato:content>
													</label>
													<div class="radios">
														<jato:tiledView name="tiledChoices" type="com.sun.identity.authentication.UI.CallBackChoiceTiledView">
															<jato:content name="selectedChoice">
																<input type="radio" name="IDToken<jato:text name="txtParentIndex" />" id="IDToken<jato:text name="txtIndex" />" value="<jato:text name="txtIndex" />" checked="checked" />
																<label for="IDToken<jato:text name="txtIndex" />">
																	<jato:text name="txtChoice" />
																</label>
															</jato:content>

															<jato:content name="unselectedChoice">
																<input type="radio" name="IDToken<jato:text name="txtParentIndex" />" id="IDToken<jato:text name="txtIndex" />" value="<jato:text name="txtIndex" />" />
																<label for="IDToken<jato:text name="txtIndex" />">
																	<jato:text name="txtChoice" />
																</label>
															</jato:content>
														</jato:tiledView>
													</div>
												</div>
										</jato:content>
									</jato:tiledView>

									<jato:content name="ContentStaticTextResult">
										<!-- after login output message -->
										<p><b><jato:getDisplayFieldValue name='StaticTextResult'
																	 defaultValue='' fireDisplayEvents='true' escape='false'/></b></p>
											</jato:content>
											<jato:content name="ContentHref">
										<!-- URL back to Login page -->
										<p><auth:href name="LoginURL" fireDisplayEvents='true'>
												<jato:text name="txtGotoLoginAfterFail" /></auth:href></p>
										</jato:content>
										<jato:content name="ContentImage">
										<!-- customized image defined in properties file -->
										<p><img name="IDImage" src="<jato:getDisplayFieldValue name='Image'/>" alt=""/></p>
									</jato:content>

									<jato:content name="ContentButtonLogin">
										<fieldset>
											<jato:content name="hasButton">
												<div class="row">
													<jato:tiledView name="tiledButtons"
																	type="com.sun.identity.authentication.UI.ButtonTiledView">
														<input name="Login.Submit" type="button" onclick="LoginSubmit('<jato:text name="txtButton" />'); return false;" class="button" value="<jato:text name="txtButton" />" />
													</jato:tiledView>
												</div>
												<script language="javascript" type="text/javascript">
													<!--
													defaultBtn = '<jato:text name="defaultBtn" />';
													var inputs = document.getElementsByTagName('input');
													for (var i = 0; i < inputs.length; i ++) {
														if (inputs[i].type == 'button' && inputs[i].value == defaultBtn) {
															inputs[i].setAttribute("class", "button primary");;
															break;
														}
													}
													-->
												</script>
											</jato:content>
											<jato:content name="hasNoButton">
												<div class="row">
													<input name="Login.Submit" type="submit" onclick="LoginSubmit('<jato:text name="lblSubmit" />'); return false;" class="button primary" value="<jato:text name="lblSubmit" />" />
												</div>
											</jato:content>
										</fieldset>
									</jato:content>
									<script language="javascript" type="text/javascript">
										<!--
										if (elmCount != null) {
											document.write("<input name=\"IDButton"  + "\" type=\"hidden\">");
										}
										-->
									</script>
									<input type="hidden" name="goto" value="<%= gotoURL%>" />
									<input type="hidden" name="gotoOnFail" value="<%= gotoOnFailURL%>"/>
									<input type="hidden" name="SunQueryParamsString" value="<%= encodedQueryParams%>" />
									<input type="hidden" name="encoded" value="<%= encoded%>" />
								</auth:form>
							</jato:content>
						</div>
					</div>
				</div>
				<div class="footer alt-color">
					<div class="grid_6 suffix_3">
						<p><auth:resBundle bundleName="amAuthUI" resourceKey="copyright.notice" /></p>
					</div>
				</div>
			</div>
			
	<script>
	document.write('<script src=' +
	('__proto__' in {} ? 'scripts/libs/zepto' : 'scripts/libs/jquery') +
	'.js><\/script>')
	</script>
	
	<script src="scripts/foundation/foundation.js"></script>
		
		<script src="scripts/foundation/foundation.alerts.js"></script>
		
		<script src="scripts/foundation/foundation.clearing.js"></script>
		
		<script src="scripts/foundation/foundation.cookie.js"></script>
		
		<script src="scripts/foundation/foundation.dropdown.js"></script>
		
		<script src="scripts/foundation/foundation.forms.js"></script>
		
		<script src="scripts/foundation/foundation.joyride.js"></script>
		
		<script src="scripts/foundation/foundation.magellan.js"></script>
		
		<script src="scripts/foundation/foundation.orbit.js"></script>
		
		<script src="scripts/foundation/foundation.placeholder.js"></script>
		
		<script src="scripts/foundation/foundation.reveal.js"></script>
		
		<script src="scripts/foundation/foundation.section.js"></script>
		
		<script src="scripts/foundation/foundation.tooltips.js"></script>
		
		<script src="scripts/foundation/foundation.topbar.js"></script>
		
	
	<script>
		$(document).foundation();
	</script>

		<!-- build:js scripts/main.js -->
			<script data-main="scripts/main" src="scripts/libs/require.js"></script>
		<!-- endbuild -->
		</body>
	</jato:useViewBean>
</html>
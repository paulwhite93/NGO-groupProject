package com.configuration;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.service.UserDetailsServiceImpl;

import ch.qos.logback.classic.Logger;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException{
		Logger logger = (Logger) LoggerFactory.getLogger(JwtTokenUtil.class);
		// TODO Auto-generated method stub
		//get request header
		String Token = request.getHeader("Authorization");
		logger.info("Bearer token: [{}]",Token);
		System.out.println("jwtAuthenticationFilter token: "+Token);
		if(Token == null || !Token.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return ;
        }
		if (Token != null) {
            String accessToken = Token.replace("Bearer ", "");
            logger.info("jwt token: [{}]",accessToken);
            //Get email from token
            String email=jwtTokenUtil.extractUseruserEmail(accessToken);
            if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            	//Get user data
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
                if (jwtTokenUtil.isTokenValid(accessToken, userDetails)) {
                	//Mapped user detail and authentication in authToken
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    //use SecurityContextHolder to pass authentication to spring security
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            //pass request to controller
            filterChain.doFilter(request, response);
            
		}
	}

}

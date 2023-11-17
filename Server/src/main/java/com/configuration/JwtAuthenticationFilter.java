package com.configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//get request header
		String Token = request.getHeader("Authorization");
		System.out.println("jwtAuthenticationFilter token: "+Token);
		if(Token == null || !Token.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return ;
        }
		if (Token != null) {
            String accessToken = Token.replace("Bearer ", "");
            System.out.println("jwtAuthenticationFilter accessToken: "+accessToken);
            //Get email from token
            String email=jwtTokenUtil.extractUseruserEmail(Token);
            if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            	//Get user data
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
                if (jwtTokenUtil.isTokenValid(Token, userDetails)) {
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
                    request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
                }
            }
            //pass request to controller
            filterChain.doFilter(request, response);
            
		}
	}

}

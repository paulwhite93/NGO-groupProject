package com.configuration;

import ch.qos.logback.classic.Logger;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.slf4j.LoggerFactory;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtTokenUtil{

	Logger logger = (Logger) LoggerFactory.getLogger(JwtTokenUtil.class);
	@Value("${jwt.secret-key}")
    private static String SECRET_KEY="ZXF1aXBtZW50c291dGhmb3J0Y3J5bW9udGhhbnlib2R5YnJpZGdlYWN0aXZlY2FyZWY=";

    public String extractUseruserEmail(String token) {
    	final Claims claims = extractAllClaims(token);
    	return claims.getSubject();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(String useremail){
        return createToken(useremail);
    }


    public String createToken(String useremail){
    	Claims claims = Jwts.claims().setSubject(useremail);
    	logger.info("Current time: {}", Instant.now());
        return Jwts
                .builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 *24))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
                .setHeaderParam("typ", "JWT")
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String userEmail = extractUseruserEmail(token);
        logger.info("userEmail in jwtTokenUtil ", userEmail);
        return (userEmail.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
    	Claims claims=extractAllClaims(token);
        Date expiration = claims.getExpiration();
        return expiration;
    }

    private Claims extractAllClaims(String token){
    	Claims claims;
        try {
            claims = Jwts
            		.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
        	logger.error("Could not get all claims from the passed token. Error: {}", e.getMessage());
            e.printStackTrace();  // Add this line to print the stack trace
            claims = null;
        }
      
        return claims;
    }

}

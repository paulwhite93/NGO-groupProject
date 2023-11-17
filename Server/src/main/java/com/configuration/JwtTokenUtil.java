package com.configuration;

import ch.qos.logback.classic.Logger;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtTokenUtil{

	Logger logger = (Logger) LoggerFactory.getLogger(JwtTokenUtil.class);


    private static String SECRET_KEY="ZXF1aXBtZW50c291dGhmb3J0Y3J5bW9udGhhbnlib2R5YnJpZGdlYWN0aXZlY2FyZWY=";
//	private static String SECRET_KEY="482B4D6251655468576D5A7134743777217A25432A462D4A404E635266556A58";
    


    public String extractUseruserEmail(String token) {
    	return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(String useremail){
//    	Map<String,Object> claims = new HashMap<>();
        return createToken(useremail);
    }


    public String createToken(String useremail){
    	Claims claims = Jwts.claims().setSubject(useremail);
        return Jwts
                .builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 *24))
                .signWith(SignatureAlgorithm.HS256,SECRET_KEY)
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
        	logger.error("Could not get all claims Token from passed token");
            claims = null;
        }
        return claims;
    }
    

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        System.out.println("getSigningKey: "+keyBytes);
        return Keys.hmacShaKeyFor(keyBytes);

    }

}

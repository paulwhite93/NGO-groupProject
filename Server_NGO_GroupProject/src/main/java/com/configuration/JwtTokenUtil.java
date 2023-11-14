package com.configuration;

import ch.qos.logback.classic.Logger;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.Serializable;
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


    public String extractUsername(String token) {
    	Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
        	logger.error("Could not get all claims Token from passed token");
            claims = null;
        }
        String userEmail = claims.getSubject();
        return userEmail;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(String useremail){
    	Map<String,Object> claims = new HashMap<>();
        return createToken(claims, useremail);
    }


    public String createToken(Map<String, Object> extraClaims, String useremail){
        return Jwts
                .builder()
                .setSubject(useremail)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 *24))
                .signWith(SignatureAlgorithm.HS256, getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        logger.info("username in jwtservice ", username);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
    	Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
        	logger.error("Could not get all claims Token from passed token");
            claims = null;
        }
        Date expiration = claims.getExpiration();
        return expiration;
    }


    private Claims extractAllClaims(String token){
    	Claims claims;
        try {
            claims = Jwts.parser()
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
        return Keys.hmacShaKeyFor(keyBytes);

    }

}
//
//import com.entity.Users;
//import com.example.springjwt.model.User;
//import io.jsonwebtoken.*;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//import java.util.List;
//import java.util.concurrent.TimeUnit;

//@Component
//public class JwtTokenUtil {
//
//
//    private final String secret_key = "mysecretkey";
//    private long accessTokenValidity = 60*60*1000;
//
//    private final JwtParser jwtParser;
//
//    private final String TOKEN_HEADER = "Authorization";
//    private final String TOKEN_PREFIX = "Bearer ";
//
//    public JwtTokenUtil(){
//        this.jwtParser = Jwts.parser().setSigningKey(secret_key);
//    }
//
//    public String createToken(Users user) {
//        Claims claims = Jwts.claims().setSubject(user.getEmail());
//        claims.put("firstName",user.getFirstName());
//        claims.put("lastName",user.getLastName());
//        Date tokenCreateTime = new Date();
//        Date tokenValidity = new Date(tokenCreateTime.getTime() + TimeUnit.MINUTES.toMillis(accessTokenValidity));
//        return Jwts.builder()
//                .setClaims(claims)
//                .setExpiration(tokenValidity)
//                .signWith(SignatureAlgorithm.HS256, secret_key)
//                .compact();
//    }
//
//    private Claims parseJwtClaims(String token) {
//        return jwtParser.parseClaimsJws(token).getBody();
//    }
//
//    public Claims resolveClaims(HttpServletRequest req) {
//        try {
//            String token = resolveToken(req);
//            if (token != null) {
//                return parseJwtClaims(token);
//            }
//            return null;
//        } catch (ExpiredJwtException ex) {
//            req.setAttribute("expired", ex.getMessage());
//            throw ex;
//        } catch (Exception ex) {
//            req.setAttribute("invalid", ex.getMessage());
//            throw ex;
//        }
//    }
//
//    public String resolveToken(HttpServletRequest request) {
//
//        String bearerToken = request.getHeader(TOKEN_HEADER);
//        if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
//            return bearerToken.substring(TOKEN_PREFIX.length());
//        }
//        return null;
//    }
//
//    public boolean validateClaims(Claims claims) throws AuthenticationException {
//        try {
//            return claims.getExpiration().after(new Date());
//        } catch (Exception e) {
//            throw e;
//        }
//    }
//
//    public String extractEmail(Claims claims) {
//        return claims.getSubject();
//    }
//
//    private List<String> getRoles(Claims claims) {
//        return (List<String>) claims.get("roles");
//    }
//
//
//}

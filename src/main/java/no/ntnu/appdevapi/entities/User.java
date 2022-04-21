package no.ntnu.appdevapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(unique = true, name = "user_id")
  private long id;
  @ApiModelProperty("First name of the user")
  @Column(name = "first_name")
  private String firstName;
  @ApiModelProperty("Last name of the user")
  @Column(name = "last_name")
  private String lastName;
  @ApiModelProperty("The users email-address")
  @Column(unique = true)
  private String email;
  @ApiModelProperty("Password of the user")
  @JsonIgnore
  private String password;
  @ApiModelProperty("Date and time of the creation of the user")
  @Column(name = "created_at")
  private LocalDateTime createdAt;
  @ApiModelProperty("Date and time of the last update of user info")
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
//  @ApiModelProperty("The permission-ID of the user")
//  @Column(name = "fk_permission_id")
//  private Integer permissionID;
  @ApiModelProperty("If the user is enabled or not")
  private boolean enabled;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name="pl_id")
  private PermissionLevel permissionLevel;

  public long getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

//  public void setPermissionID(Integer permissionID) {
//    this.permissionID = permissionID;
//  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public List<PermissionLevel> getPermissionLevel() {
    List<PermissionLevel> permissionLevels = new ArrayList<>();
    permissionLevels.add(permissionLevel);
    return permissionLevels;
  }

  public void setPermissionLevel(PermissionLevel permissionLevel) {
    this.permissionLevel = permissionLevel;
  }
}

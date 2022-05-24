import React, { useState, useEffect, useRef } from "react";
import { useProfile } from "../context/ProfileContext";
import { IUserProfile } from "./../types/profile.d";
import { useAuth } from "../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../styles/updateProfile.modules.css";
function UpdateProfileForm() {
  useAccountsChanged();
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const { updateProfile } = useProfile();
  const { accounts } = useAuth();
  const navigate = useNavigate();
  const createProfileObj = (
    username: string | undefined,
    bio: string | undefined
  ) => {
    if (!(username && bio)) return;
    if (username.length === 0 || bio.length === 0) {
      return;
    }
    return { uid: accounts[0], username: username, bio: bio };
  };
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameVal: string | undefined = usernameRef.current?.value;
    const bioVal: string | undefined = bioRef.current?.value;
    const profileObj: IUserProfile | undefined = createProfileObj(
      usernameVal,
      bioVal
    );
    if (profileObj !== undefined) {
      updateProfile(profileObj);
      navigate(`/profile-page/${accounts[0]}`);
    }
  };
  return (
    <>
      <section className="update-profile-sect">
        <Form className="update-profile-form">
          <Form.Group>
            <Form.Label className="update-uname-label">Username</Form.Label>
            <Form.Control
              required
              className="update-uname-input"
              ref={usernameRef}
              type="text"
              minLength={1}
              placeholder="Enter your username"
            />
          </Form.Group>
          <Form.Group className="update-bio-group">
            <Form.Label className="update-bio-label">Bio</Form.Label>
            <Form.Control
              className="update-content-textarea"
              as="textarea"
              required
              ref={bioRef}
              placeholder="Enter a short description about yourself. Max 100 characters."
              rows={5}
              maxLength={100}
            />
          </Form.Group>
          <Button size="sm" type="submit" onClick={handleProfileUpdate}>
            Update Profile
          </Button>
        </Form>
      </section>
    </>
  );
}

export default UpdateProfileForm;

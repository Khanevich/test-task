import React from 'react';
import './Footer.css';
import { Button } from '../Button/Button';

export function Footer({ onReset, onCancel, onSave }) {
  return (
    <div className="footer">
      <div className="buttons-wrapper">
        <Button onClick={onReset} variant="danger" title="Reset" />
        <Button onClick={onSave} variant="success" title="Save" />
        <Button onClick={onCancel} variant="secondary" title="Cancel" />
      </div>
    </div>
  );
}

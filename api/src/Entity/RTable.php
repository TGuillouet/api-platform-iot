<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\RTableRepository")
 */
class RTable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $state;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=16)
     */
    private $mac_address;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Chair", mappedBy="rtable")
     */
    private $chairs;

    public function __construct()
    {
        $this->chairs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getMacAddress(): ?string
    {
        return $this->mac_address;
    }

    public function setMacAddress(string $mac_address): self
    {
        $this->mac_address = $mac_address;

        return $this;
    }

    /**
     * @return Collection|Chair[]
     */
    public function getChairs(): Collection
    {
        return $this->chairs;
    }

    public function addChair(Chair $chair): self
    {
        if (!$this->chairs->contains($chair)) {
            $this->chairs[] = $chair;
            $chair->setRtable($this);
        }

        return $this;
    }

    public function removeChair(Chair $chair): self
    {
        if ($this->chairs->contains($chair)) {
            $this->chairs->removeElement($chair);
            // set the owning side to null (unless already changed)
            if ($chair->getRtable() === $this) {
                $chair->setRtable(null);
            }
        }

        return $this;
    }
}

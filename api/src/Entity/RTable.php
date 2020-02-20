<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


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
     * @Groups({"chairs"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"chairs"})
     */
    private $state;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"chairs"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(max=16)
     * @Groups({"chairs"})
     */
    private $macAddress;

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
        return $this->macAddress;
    }

    public function setMacAddress(string $macAddress): self
    {
        $this->macAddress = $macAddress;

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
